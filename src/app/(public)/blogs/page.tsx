import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Calendar, Clock, User, ArrowRight, Sparkles } from "lucide-react";
import { Card, Badge, Button } from "@/design-system";

export const metadata: Metadata = {
  title: "Study Abroad Blog & Guides | Vikram Edu Consultants",
  description: "Expert articles on F-1 student visas, IELTS prep, university admission strategies, and full-tuition scholarship guides.",
};

const BLOG_POSTS = [
  {
    id: "blog-1",
    title: "Complete Guide to F-1 Visa Interview Questions & Financial Proof",
    category: "Visa Guidance",
    readTime: "6 min read",
    date: "Jan 24, 2025",
    author: "Rajesh Sharma",
    snippet: "Learn how to present your bank balance certificate, sponsor affidavits, and answer 'Why this university?' to secure your F-1 visa approval on the first attempt.",
  },
  {
    id: "blog-2",
    title: "How to Write a Winning Statement of Purpose (SOP) for Ivy League Universities",
    category: "SOP & LOR",
    readTime: "8 min read",
    date: "Jan 18, 2025",
    author: "Ananya Reddy",
    snippet: "Avoid generic templates. Discover the 5-paragraph structure used by admitted MIT, Oxford, and Stanford students to highlight technical projects and career vision.",
  },
  {
    id: "blog-3",
    title: "Top 10 Full Tuition Scholarships for International Master's Students in 2025",
    category: "Scholarships",
    readTime: "10 min read",
    date: "Jan 10, 2025",
    author: "Dr. Vikramaditya",
    snippet: "Detailed breakdown of Chevening, Fulbright, Knight-Hennessy, and DAAD scholarship deadlines, eligibility criteria, and stipend coverage.",
  },
  {
    id: "blog-4",
    title: "USA vs UK vs Canada: Comparing Post-Study Work Visa (OPT/PSW/PGWP) Policies",
    category: "Destination Comparison",
    readTime: "7 min read",
    date: "Jan 05, 2025",
    author: "Priya Patel",
    snippet: "A comprehensive side-by-side comparison of 3-year STEM OPT extensions in the USA, 2-year Graduate Route visas in the UK, and Canadian PGWP PR pathways.",
  },
];

export default function BlogsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F5]">
      {/* Hero Section */}
      <section className="relative bg-[#0A192F] text-white py-16 overflow-hidden border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-3">
          <Badge variant="gold" size="md">
            <BookOpen className="w-4 h-4 mr-1.5" /> Overseas Knowledge Hub
          </Badge>
          <h1 className="text-4xl font-black font-['Outfit'] text-white">Study Abroad Articles & Admission Guides</h1>
          <p className="text-slate-300 text-sm max-w-xl">Proven strategies on university shortlisting, IELTS preparation, visa mock interviews, and scholarship applications.</p>
        </div>
      </section>

      {/* Blog Cards */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <Card key={post.id} variant="flat" padding="lg" className="bg-white border border-slate-200 rounded-3xl hover:border-[#D4AF37] hover:shadow-xl transition-all flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs">
                  <Badge variant="gold" size="sm">{post.category}</Badge>
                  <span className="text-slate-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                </div>

                <h3 className="font-bold text-xl text-[#0B1B3D] font-['Outfit'] leading-snug">{post.title}</h3>
                <p className="text-slate-600 text-xs leading-relaxed">{post.snippet}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-slate-500">
                  <User className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{post.author} • {post.date}</span>
                </div>

                <Link href="/book-consultation">
                  <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Read Article
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
