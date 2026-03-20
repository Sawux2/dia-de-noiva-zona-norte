/**
 * CAMADA DE DADOS - Leads / Clientes (Supabase)
 */

import { supabase } from '../supabase/client';
import { Lead, LeadInput, LeadStatus, LeadService } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRowToLead(row: any): Lead {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email,
    service: row.service as LeadService,
    eventDate: row.event_date,
    message: row.message,
    source: row.source,
    utmSource: row.utm_source,
    utmMedium: row.utm_medium,
    utmCampaign: row.utm_campaign,
    status: row.status as LeadStatus,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapLeadToRow(lead: Partial<LeadInput & { status?: string; notes?: string }>): any {
  const row: any = {};
  if (lead.name !== undefined) row.name = lead.name;
  if (lead.phone !== undefined) row.phone = lead.phone;
  if (lead.email !== undefined) row.email = lead.email;
  if (lead.service !== undefined) row.service = lead.service;
  if (lead.eventDate !== undefined) row.event_date = lead.eventDate;
  if (lead.message !== undefined) row.message = lead.message;
  if (lead.source !== undefined) row.source = lead.source;
  if (lead.utmSource !== undefined) row.utm_source = lead.utmSource;
  if (lead.utmMedium !== undefined) row.utm_medium = lead.utmMedium;
  if (lead.utmCampaign !== undefined) row.utm_campaign = lead.utmCampaign;
  if (lead.status !== undefined) row.status = lead.status;
  if (lead.notes !== undefined) row.notes = lead.notes;
  return row;
}

export async function getAllLeads(status?: LeadStatus): Promise<Lead[]> {
  let query = supabase.from('leads').select('*').order('created_at', { ascending: false });
  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching leads:', error);
    return [];
  }
  return data.map(mapRowToLead);
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const { data, error } = await supabase.from('leads').select('*').eq('id', id).single();
  if (error || !data) return null;
  return mapRowToLead(data);
}

export async function createLead(input: LeadInput): Promise<Lead | null> {
  const row = mapLeadToRow(input);
  const { data, error } = await supabase
    .from('leads')
    .insert([row])
    .select()
    .single();

  if (error || !data) {
    console.error('Error creating lead:', error);
    return null;
  }
  return mapRowToLead(data);
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
  const row = mapLeadToRow(updates);
  const { data, error } = await supabase
    .from('leads')
    .update(row)
    .eq('id', id)
    .select()
    .single();

  if (error || !data) return null;
  return mapRowToLead(data);
}

export async function deleteLead(id: string): Promise<boolean> {
  const { error } = await supabase.from('leads').delete().eq('id', id);
  return !error;
}

export async function getLeadStats() {
  const { data, error } = await supabase.from('leads').select('status, service, utm_source, created_at');
  
  if (error || !data) {
    return { total: 0, newLeads: 0, contacted: 0, converted: 0, lost: 0, conversionRate: 0, leadsThisMonth: 0, byService: [], bySource: [] };
  }

  const total = data.length;
  const newLeads = data.filter(l => l.status === 'new').length;
  const contacted = data.filter(l => l.status === 'contacted').length;
  const converted = data.filter(l => l.status === 'converted').length;
  const lost = data.filter(l => l.status === 'lost').length;
  const conversionRate = total > 0 ? Math.round((converted / total) * 100) : 0;

  const byService: Record<string, number> = {};
  const bySource: Record<string, number> = {};

  data.forEach((l: any) => {
    byService[l.service] = (byService[l.service] || 0) + 1;
    const src = l.utm_source || 'direct';
    bySource[src] = (bySource[src] || 0) + 1;
  });

  const thisMonth = new Date();
  thisMonth.setDate(1);
  const leadsThisMonth = data.filter(l => new Date(l.created_at) >= thisMonth).length;

  return {
    total,
    newLeads,
    contacted,
    converted,
    lost,
    conversionRate,
    leadsThisMonth,
    byService: Object.entries(byService).map(([service, count]) => ({ service, count })).sort((a, b) => b.count - a.count),
    bySource: Object.entries(bySource).map(([source, count]) => ({ source, count })).sort((a, b) => b.count - a.count),
  };
}
