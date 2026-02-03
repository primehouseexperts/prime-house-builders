import React from 'react';
import { NavItem, ProjectConfig } from './types.ts';
import { Home, Info, Briefcase, Mail } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

/**
 * PROJECT REGISTRY
 * To add a new project:
 * 1. Create a folder: /projects/[folder-name]
 * 2. Create description: /projects/[folder-name]/markdown.md
 * 3. Add images: /projects/[folder-name]/images/
 * 4. Register the folder name below
 */
export const PROJECT_REGISTRY: ProjectConfig[] = [
  { 
    id: 'lakeside',
    folder: 'lakeside-villa', 
    displayName: 'Modern Lakeside Villa',
    thumbnail: '1.jpg' // looks for /projects/lakeside-villa/images/1.jpg
  },
  { 
    id: 'urban',
    folder: 'urban-penthouse', 
    displayName: 'Urban Penthouse Loft',
    thumbnail: 'main.jpg'
  },
  { 
    id: 'coastal',
    folder: 'coastal-retreat', 
    displayName: 'Coastal Retreat',
    thumbnail: 'hero.jpg'
  }
];

export const SERVICES = [
  {
    title: 'Custom Home Building',
    description: 'From blueprint to key handover, we build homes that reflect your unique lifestyle.',
    icon: <Home className="w-8 h-8" />
  },
  {
    title: 'Renovations & Extensions',
    description: 'Breathe new life into your existing space with high-end structural modifications.',
    icon: <Briefcase className="w-8 h-8" />
  },
  {
    title: 'Commercial Construction',
    description: 'Modern office spaces and retail environments built with efficiency and style.',
    icon: <Info className="w-8 h-8" />
  },
  {
    title: 'Consultancy',
    description: 'Expert advice on site selection, material durability, and architectural feasibility.',
    icon: <Mail className="w-8 h-8" />
  }
];