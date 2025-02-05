"use client"

import { AdminDashboard } from '@/components/features/admin';
import { NavBar } from '@/components/layout/NavBar';

export default function AdminPage() {
  return (
    <>
      <NavBar />
      <main className="min-h-screen pt-16">
        <AdminDashboard />
      </main>
    </>
  );
} 