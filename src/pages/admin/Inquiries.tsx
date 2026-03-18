import React from 'react';
import { MessageSquare, Phone, Mail, Search } from 'lucide-react';

export function Inquiries() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif tracking-wider text-white mb-2">Customer Inquiries</h1>
          <p className="text-white/50">Manage WhatsApp clicks and contact form messages</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 flex items-center">
          <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mr-4">
            <MessageSquare className="w-6 h-6 text-green-400" />
          </div>
          <div>
            <p className="text-white/50 text-sm">WhatsApp Clicks</p>
            <p className="text-2xl font-serif text-white">1,245</p>
          </div>
        </div>
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 flex items-center">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mr-4">
            <Mail className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <p className="text-white/50 text-sm">Form Submissions</p>
            <p className="text-2xl font-serif text-white">84</p>
          </div>
        </div>
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-6 flex items-center">
          <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mr-4">
            <Phone className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <p className="text-white/50 text-sm">Direct Calls</p>
            <p className="text-2xl font-serif text-white">312</p>
          </div>
        </div>
      </div>

      <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search inquiries..."
              className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
            />
          </div>
          <select className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30">
            <option value="">All Types</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="form">Contact Form</option>
          </select>
        </div>

        <table className="w-full text-left text-sm text-white/70">
          <thead className="bg-white/5 text-white/40 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">Customer</th>
              <th className="px-6 py-4 font-medium">Type</th>
              <th className="px-6 py-4 font-medium">Inquiry Details</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4">
                  <p className="text-white font-medium">Customer {i}</p>
                  <p className="text-xs text-white/40 mt-0.5">+91 98765 43210</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    i % 2 === 0 ? 'bg-green-500/10 text-green-400' : 'bg-blue-500/10 text-blue-400'
                  }`}>
                    {i % 2 === 0 ? 'WhatsApp' : 'Contact Form'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-white/80 max-w-xs truncate">
                    Interested in wholesale pricing for Casement Petticoats...
                  </p>
                </td>
                <td className="px-6 py-4 text-white/60">2 hours ago</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-xs border border-white/20 text-white px-3 py-1 rounded-lg hover:bg-white/10 transition-colors">
                    Mark Responded
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
