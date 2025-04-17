
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, Trash2, Plus } from 'lucide-react';

interface Channel {
  id: number;
  name: string;
  logo: string;
  slug: string;
}

interface Stream {
  id: number;
  name: string;
  language: string;
  quality: string;
  url: string;
}

const ManageChannels = () => {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isStreamDialogOpen, setIsStreamDialogOpen] = useState(false);
  const [newChannel, setNewChannel] = useState({ name: '', logo: '📺', slug: '' });
  const [editingChannel, setEditingChannel] = useState<Channel | null>(null);
  const [currentChannelStreams, setCurrentChannelStreams] = useState<Stream[]>([]);
  const [selectedChannelSlug, setSelectedChannelSlug] = useState('');
  const [newStream, setNewStream] = useState({
    name: '',
    language: 'English',
    quality: 'HD',
    url: ''
  });
  
  const { toast } = useToast();

  useEffect(() => {
    // Load channels from localStorage
    const savedChannels = localStorage.getItem('channels');
    if (savedChannels) {
      setChannels(JSON.parse(savedChannels));
    } else {
      // Default channels
      const defaultChannels = [
        { id: 1, name: 'TNT Sports', logo: '🔴', slug: 'tnt-sports' },
        { id: 2, name: 'SuperSport', logo: '⚪', slug: 'super-sport' },
        { id: 3, name: 'beIN Sports', logo: '🟢', slug: 'bein-sports' }
      ];
      setChannels(defaultChannels);
      localStorage.setItem('channels', JSON.stringify(defaultChannels));
    }
  }, []);

  const handleAddChannel = () => {
    if (!newChannel.name) {
      toast({
        title: "Error",
        description: "Channel name is required",
        variant: "destructive"
      });
      return;
    }

    // Generate slug if not provided
    const slug = newChannel.slug || newChannel.name.toLowerCase().replace(/\s+/g, '-');
    
    const newChannelWithId = {
      id: channels.length ? Math.max(...channels.map(c => c.id)) + 1 : 1,
      name: newChannel.name,
      logo: newChannel.logo || '📺',
      slug
    };
    
    const updatedChannels = [...channels, newChannelWithId];
    setChannels(updatedChannels);
    localStorage.setItem('channels', JSON.stringify(updatedChannels));
    
    setNewChannel({ name: '', logo: '📺', slug: '' });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Channel Added",
      description: `${newChannelWithId.name} has been added successfully.`,
    });
  };

  const handleEditChannel = () => {
    if (!editingChannel || !editingChannel.name) return;
    
    const updatedChannels = channels.map(channel => 
      channel.id === editingChannel.id ? editingChannel : channel
    );
    
    setChannels(updatedChannels);
    localStorage.setItem('channels', JSON.stringify(updatedChannels));
    
    setIsEditDialogOpen(false);
    
    toast({
      title: "Channel Updated",
      description: `${editingChannel.name} has been updated successfully.`,
    });
  };

  const handleDeleteChannel = (id: number) => {
    const channelToDelete = channels.find(c => c.id === id);
    if (!channelToDelete) return;
    
    const updatedChannels = channels.filter(channel => channel.id !== id);
    setChannels(updatedChannels);
    localStorage.setItem('channels', JSON.stringify(updatedChannels));
    
    // Clean up any streams for this channel
    localStorage.removeItem(`channel_${channelToDelete.slug}_streams`);
    
    toast({
      title: "Channel Deleted",
      description: `${channelToDelete.name} has been deleted successfully.`,
    });
  };

  const openStreamsDialog = (channelSlug: string) => {
    setSelectedChannelSlug(channelSlug);
    
    // Load streams for this channel
    const savedStreams = localStorage.getItem(`channel_${channelSlug}_streams`);
    if (savedStreams) {
      setCurrentChannelStreams(JSON.parse(savedStreams));
    } else {
      setCurrentChannelStreams([]);
    }
    
    setIsStreamDialogOpen(true);
  };

  const handleAddStream = () => {
    if (!newStream.name || !newStream.url) {
      toast({
        title: "Error",
        description: "Stream name and URL are required",
        variant: "destructive"
      });
      return;
    }
    
    const streamWithId = {
      ...newStream,
      id: currentChannelStreams.length ? Math.max(...currentChannelStreams.map(s => s.id)) + 1 : 1
    };
    
    const updatedStreams = [...currentChannelStreams, streamWithId];
    setCurrentChannelStreams(updatedStreams);
    localStorage.setItem(`channel_${selectedChannelSlug}_streams`, JSON.stringify(updatedStreams));
    
    setNewStream({
      name: '',
      language: 'English',
      quality: 'HD',
      url: ''
    });
    
    toast({
      title: "Stream Added",
      description: `Stream source has been added successfully.`,
    });
  };

  const handleDeleteStream = (id: number) => {
    const updatedStreams = currentChannelStreams.filter(stream => stream.id !== id);
    setCurrentChannelStreams(updatedStreams);
    localStorage.setItem(`channel_${selectedChannelSlug}_streams`, JSON.stringify(updatedStreams));
    
    toast({
      title: "Stream Deleted",
      description: "Stream source has been deleted successfully.",
    });
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Manage 24/7 Channels</h2>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus size={16} className="mr-2" />
          Add Channel
        </Button>
      </div>

      {channels.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          No channels found. Add some channels first.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Channel Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Streams</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {channels.map((channel) => (
                <TableRow key={channel.id}>
                  <TableCell className="text-2xl">{channel.logo}</TableCell>
                  <TableCell className="font-medium">{channel.name}</TableCell>
                  <TableCell className="text-gray-400">{channel.slug}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => openStreamsDialog(channel.slug)}>
                      Manage Streams
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => {
                          setEditingChannel(channel);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteChannel(channel.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Add Channel Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Channel</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Channel Name</label>
              <Input 
                value={newChannel.name}
                onChange={(e) => setNewChannel({...newChannel, name: e.target.value})}
                placeholder="e.g. ESPN"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Logo Emoji</label>
              <Input 
                value={newChannel.logo}
                onChange={(e) => setNewChannel({...newChannel, logo: e.target.value})}
                placeholder="e.g. 📺"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Slug (optional)</label>
              <Input 
                value={newChannel.slug}
                onChange={(e) => setNewChannel({...newChannel, slug: e.target.value})}
                placeholder="e.g. espn (will be auto-generated if empty)"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddChannel}>Add Channel</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Channel Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Channel</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Channel Name</label>
              <Input 
                value={editingChannel?.name || ''}
                onChange={(e) => setEditingChannel(editingChannel ? {...editingChannel, name: e.target.value} : null)}
                placeholder="e.g. ESPN"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Logo Emoji</label>
              <Input 
                value={editingChannel?.logo || ''}
                onChange={(e) => setEditingChannel(editingChannel ? {...editingChannel, logo: e.target.value} : null)}
                placeholder="e.g. 📺"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Slug</label>
              <Input 
                value={editingChannel?.slug || ''}
                onChange={(e) => setEditingChannel(editingChannel ? {...editingChannel, slug: e.target.value} : null)}
                placeholder="e.g. espn"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEditChannel}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Manage Streams Dialog */}
      <Dialog open={isStreamDialogOpen} onOpenChange={setIsStreamDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Manage Stream Sources</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <h3 className="font-semibold">Current Streams</h3>
            
            {currentChannelStreams.length === 0 ? (
              <div className="text-center py-4 text-gray-400">
                No streams added yet. Add some stream sources below.
              </div>
            ) : (
              <div className="overflow-x-auto max-h-48 overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Quality</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentChannelStreams.map((stream) => (
                      <TableRow key={stream.id}>
                        <TableCell className="font-medium">{stream.name}</TableCell>
                        <TableCell>{stream.language}</TableCell>
                        <TableCell>{stream.quality}</TableCell>
                        <TableCell>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteStream(stream.id)}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
            
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Add New Stream</h3>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="grid gap-1">
                  <label className="text-xs">Name</label>
                  <Input 
                    value={newStream.name}
                    onChange={(e) => setNewStream({...newStream, name: e.target.value})}
                    placeholder="e.g. HD Stream 1"
                    className="text-sm"
                  />
                </div>
                <div className="grid gap-1">
                  <label className="text-xs">Language</label>
                  <Input 
                    value={newStream.language}
                    onChange={(e) => setNewStream({...newStream, language: e.target.value})}
                    placeholder="e.g. English"
                    className="text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="grid gap-1">
                  <label className="text-xs">Quality</label>
                  <Input 
                    value={newStream.quality}
                    onChange={(e) => setNewStream({...newStream, quality: e.target.value})}
                    placeholder="e.g. HD"
                    className="text-sm"
                  />
                </div>
                <div className="grid gap-1">
                  <label className="text-xs">URL (iframe src)</label>
                  <Input 
                    value={newStream.url}
                    onChange={(e) => setNewStream({...newStream, url: e.target.value})}
                    placeholder="https://example.com/embed"
                    className="text-sm"
                  />
                </div>
              </div>
              <Button onClick={handleAddStream} className="w-full mt-2">Add Stream</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManageChannels;
