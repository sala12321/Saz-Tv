
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { LogOut } from 'lucide-react';
import AdminLogin from '../components/admin/AdminLogin';
import CreateMatch from '../components/admin/CreateMatch';
import ManageMatches from '../components/admin/ManageMatches';
import AddStreamLinks from '../components/admin/AddStreamLinks';
import ManageChannels from '../components/admin/ManageChannels';
import Messages from '../components/admin/Messages';
import ManageStreamSources from '../components/admin/ManageStreamSources';

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuth') === 'true';
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    setAuthenticated(false);
  };

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-sports-dark text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="create" className="w-full">
          <TabsList className="w-full bg-gray-900 mb-6">
            <TabsTrigger value="create" className="flex-1">Create Match</TabsTrigger>
            <TabsTrigger value="manage" className="flex-1">Manage Matches</TabsTrigger>
            <TabsTrigger value="streams" className="flex-1">Add Stream Links</TabsTrigger>
            <TabsTrigger value="channels" className="flex-1">Manage Channels</TabsTrigger>
            <TabsTrigger value="sources" className="flex-1">Stream Sources</TabsTrigger>
            <TabsTrigger value="messages" className="flex-1">Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="create">
            <CreateMatch />
          </TabsContent>
          
          <TabsContent value="manage">
            <ManageMatches />
          </TabsContent>
          
          <TabsContent value="streams">
            <AddStreamLinks />
          </TabsContent>
          
          <TabsContent value="channels">
            <ManageChannels />
          </TabsContent>
          
          <TabsContent value="sources">
            <ManageStreamSources />
          </TabsContent>
          
          <TabsContent value="messages">
            <Messages />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
