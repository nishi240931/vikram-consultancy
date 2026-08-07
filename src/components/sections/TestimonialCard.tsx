import React from "react";
import Image from "next/image";
import { Star, Quote, Award } from "lucide-react";
import { Card, Badge } from "@/design-system";
import { StudentTestimonial } from "@/data/testimonials";

export interface TestimonialCardProps {
  testimonial: StudentTestimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <Card
      variant="glass"
      padding="lg"
      className="flex flex-col justify-between h-full border-[#D4AF37]/20 shadow-xl relative"
    >
      <Quote className="absolute top-6 right-6 w-10 h-10 text-[#D4AF37]/15 pointer-events-none" />

      <div>
        {/* Rating Stars & Scholarship Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
            ))}
          </div>
          {testimonial.scholarshipAmount && (
            <Badge variant="gold" size="sm" className="flex items-center gap-1">
              <Award className="w-3 h-3" /> {testimonial.scholarshipAmount}
            </Badge>
          )}
        </div>

        {/* Quote */}
        <p className="text-slate-700 text-sm italic leading-relaxed mb-6">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      {/* Student Profile Info */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md flex-shrink-0">
          <Image
            src={testimonial.avatar}
            alt={testimonial.studentName}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-sm text-[#0B1B3D] font-['Outfit']">
            {testimonial.studentName}
          </span>
          <span className="text-xs text-slate-600 font-medium">
            {testimonial.courseName}
          </span>
          <span className="text-[11px] text-slate-400">
            {testimonial.flag} {testimonial.universityName} ({testimonial.intake})
          </span>
        </div>
      </div>
    </Card>
  );
};
