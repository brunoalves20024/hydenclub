import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Course } from '../types';
import { courses } from '../data/courses';
import { CourseView } from './course/CourseView';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

function CourseCard({ course, onClick }: CourseCardProps) {
  return (
    <div 
      className="bg-[#1F1F1F] rounded-lg overflow-hidden transition-all hover:scale-[1.02] hover:ring-2 hover:ring-[#E50914]/50 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-video">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <span className={`px-2 py-1 rounded text-xs font-semibold ${
            course.level === 'Beginner' ? 'bg-green-500' :
            course.level === 'Intermediate' ? 'bg-yellow-500' :
            'bg-red-500'
          }`}>
            {course.level}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-white mb-2">{course.title}</h3>
        <p className="text-white/80 text-sm mb-4">{course.description}</p>
        <div className="flex justify-between items-center text-sm text-white/60">
          <span className="flex items-center gap-1">
            🎁 {course.modules} modules
          </span>
          <span>{course.duration}</span>
        </div>
      </div>
    </div>
  );
}

export function BonusPage() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={
        <div className="min-h-screen bg-[#141414] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-3xl">🎁</span>
              <h1 className="text-3xl font-bold text-white">Bonus Courses</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course}
                  onClick={() => navigate(`/bonus/course/${course.id}`)}
                />
              ))}
            </div>
          </div>
        </div>
      } />
      <Route path="/course/:courseId" element={<CourseView />} />
    </Routes>
  );
}