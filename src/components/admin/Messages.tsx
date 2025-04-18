
import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from 'sonner';
import { Trash2, Mail, Eye, MailOpen } from 'lucide-react';

interface Message {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
  isRead: boolean;
}

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);

  useEffect(() => {
    // Load messages from localStorage
    const storedMessages = localStorage.getItem('contactMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const handleMarkAsRead = (id: number) => {
    const updatedMessages = messages.map(msg => 
      msg.id === id ? { ...msg, isRead: true } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    toast.success("Message marked as read");
  };

  const handleDeleteMessage = (id: number) => {
    const updatedMessages = messages.filter(msg => msg.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
    toast.success("Message deleted successfully");
  };

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
    setIsViewOpen(true);
    
    // Mark as read if not already
    if (!message.isRead) {
      handleMarkAsRead(message.id);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
        <Badge className="bg-sports-red">
          {messages.filter(m => !m.isRead).length} Unread
        </Badge>
      </div>
      
      {messages.length === 0 ? (
        <div className="text-center py-12 bg-gray-900 rounded-lg">
          <Mail className="mx-auto h-12 w-12 text-gray-500 mb-4" />
          <h3 className="text-xl font-medium text-gray-300">No messages yet</h3>
          <p className="text-gray-500 mt-2">When users send contact messages, they will appear here</p>
        </div>
      ) : (
        <div className="border border-gray-800 rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Name</TableHead>
                <TableHead className="text-gray-300">Email</TableHead>
                <TableHead className="text-gray-300">Phone</TableHead>
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow key={message.id} className="hover:bg-gray-800">
                  <TableCell>
                    {message.isRead ? (
                      <MailOpen className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Mail className="h-5 w-5 text-sports-red" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{message.name}</TableCell>
                  <TableCell>{message.email}</TableCell>
                  <TableCell>{message.phone || "—"}</TableCell>
                  <TableCell>{formatDate(message.date)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        onClick={() => handleViewMessage(message)} 
                        variant="outline" 
                        size="sm" 
                        className="text-gray-300"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {!message.isRead && (
                        <Button 
                          onClick={() => handleMarkAsRead(message.id)} 
                          variant="outline" 
                          size="sm"
                          className="text-sports-blue"
                        >
                          <MailOpen className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        onClick={() => handleDeleteMessage(message.id)} 
                        variant="outline" 
                        size="sm"
                        className="text-sports-red"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* Message Viewer Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="bg-gray-900 text-white border border-gray-800">
          <DialogHeader>
            <DialogTitle>Message from {selectedMessage?.name}</DialogTitle>
            <DialogDescription className="text-gray-400">
              Received on {selectedMessage && formatDate(selectedMessage.date)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-1">From:</h4>
              <p>{selectedMessage?.name}</p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-1">Email:</h4>
              <p>{selectedMessage?.email}</p>
            </div>
            
            {selectedMessage?.phone && (
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-1">Phone:</h4>
                <p>{selectedMessage.phone}</p>
              </div>
            )}
            
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-1">Message:</h4>
              <p className="whitespace-pre-wrap bg-gray-800 p-4 rounded-md">{selectedMessage?.message}</p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              variant="outline" 
              className="text-sports-red border-sports-red hover:bg-sports-red/10"
              onClick={() => {
                if (selectedMessage) handleDeleteMessage(selectedMessage.id);
                setIsViewOpen(false);
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Messages;
