
import { supabase } from "@/integrations/supabase/client";

// Profiles
export const getProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) throw error;
  return data;
};

export const updateProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
    
  if (error) throw error;
  return data;
};

// Earnings
export const getEarnings = async (userId: string, dateFrom?: string, dateTo?: string) => {
  let query = supabase
    .from('earnings')
    .select('*')
    .eq('user_id', userId);
    
  if (dateFrom) {
    query = query.gte('date', dateFrom);
  }
  
  if (dateTo) {
    query = query.lte('date', dateTo);
  }
    
  const { data, error } = await query.order('date', { ascending: false });
  
  if (error) throw error;
  return data;
};

// Notifications
export const getNotifications = async (userId: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) throw error;
  return data;
};

export const markNotificationAsRead = async (notificationId: string) => {
  const { data, error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId);
    
  if (error) throw error;
  return data;
};

// Admin functions
export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*');
    
  if (error) throw error;
  return data;
};

export const getAllEarnings = async (dateFrom?: string, dateTo?: string) => {
  let query = supabase
    .from('earnings')
    .select('*, profiles(full_name)');
    
  if (dateFrom) {
    query = query.gte('date', dateFrom);
  }
  
  if (dateTo) {
    query = query.lte('date', dateTo);
  }
    
  const { data, error } = await query.order('date', { ascending: false });
  
  if (error) throw error;
  return data;
};
