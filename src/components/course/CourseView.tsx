import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courses } from '../../data/courses';
import { Comments } from '../Comments';
import { Calendar, Clock, BookOpen, X } from 'lucide-react';

export function CourseView() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return <div className="text-center text-white py-20">Course not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-[#1F1F1F] rounded-xl overflow-hidden relative">
        <button
          onClick={() => navigate('/bonus')}
          className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full text-white/80 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="aspect-video relative">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-white">{course.title}</h1>
              <span className={`px-3 py-1 rounded text-sm font-semibold ${
                course.level === 'Beginner' ? 'bg-green-500' :
                course.level === 'Intermediate' ? 'bg-yellow-500' :
                'bg-red-500'
              }`}>
                {course.level}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-white/60 text-sm">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date().toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {course.duration}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {course.modules} modules
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">About this course</h2>
            <p className="text-white/80 leading-relaxed">
              {course.description}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Course Content</h2>
            <div className="grid gap-4">
              {Array.from({ length: course.modules }).map((_, index) => (
                <div key={index} className="bg-[#2F2F2F] p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-2">
                    Module {index + 1}: {getModuleTitle(course.title, index)}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {getModuleDescription(course.title, index)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-white">Instructor</h2>
            <div className="flex items-center gap-4">
              <img
                src={getInstructorImage(course.id)}
                alt={getInstructorName(course.id)}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-white font-medium">{getInstructorName(course.id)}</h3>
                <p className="text-white/60 text-sm">{getInstructorTitle(course.id)}</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10">
            <Comments comments={[]} />
          </div>
        </div>
      </div>
    </div>
  );
}

function getModuleTitle(courseTitle: string, index: number): string {
  const titles = {
    'Mastering the Runway Walk': [
      'Introduction to Runway Walking',
      'Posture and Balance',
      'Walking Techniques',
      'Turn and Pivot',
      'Advanced Runway Expressions'
    ],
    'Professional Posing Techniques': [
      'Understanding Camera Angles',
      'Basic Poses',
      'Working with Light',
      'Editorial Poses',
      'Commercial Poses',
      'Group Poses',
      'Action Shots',
      'Advanced Expressions'
    ]
  } as Record<string, string[]>;

  return titles[courseTitle]?.[index] || `Lesson ${index + 1}`;
}

function getModuleDescription(courseTitle: string, index: number): string {
  const descriptions = {
    'Mastering the Runway Walk': [
      'Learn the fundamentals of professional runway walking',
      'Master proper posture and balance techniques',
      'Practice different walking styles and rhythms',
      'Perfect your runway turns and pivots',
      'Develop your unique runway presence'
    ],
    'Professional Posing Techniques': [
      'Understanding how to work with different camera angles',
      'Master the essential poses every model should know',
      'Learn how to pose in different lighting conditions',
      'Advanced poses for editorial shoots',
      'Commercial modeling pose techniques',
      'Working with other models in group shots',
      'Dynamic poses for action photography',
      'Mastering facial expressions for different shoots'
    ]
  } as Record<string, string[]>;

  return descriptions[courseTitle]?.[index] || 'Detailed lesson content';
}

function getInstructorName(courseId: string): string {
  const instructors: Record<string, string> = {
    '1': 'Isabella Martinez',
    '2': 'Victoria Chen',
    '3': 'Sophie Anderson',
    '4': 'Emma Thompson',
    '5': 'Olivia Wilson',
  };
  return instructors[courseId] || 'Professional Instructor';
}

function getInstructorTitle(courseId: string): string {
  const titles: Record<string, string> = {
    '1': 'International Runway Coach',
    '2': 'Professional Fashion Photographer',
    '3': 'Fashion Industry Consultant',
    '4': 'Digital Portfolio Specialist',
    '5': 'Professional Makeup Artist',
  };
  return titles[courseId] || 'Industry Expert';
}

function getInstructorImage(courseId: string): string {
  const images: Record<string, string> = {
    '1': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    '2': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    '3': 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce',
    '4': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
    '5': 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1',
  };
  return images[courseId] || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330';
}