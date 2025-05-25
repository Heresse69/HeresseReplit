import React, { useState } from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Link } from 'react-router-dom';
    import { Card, CardHeader } from '@/components/ui/card';
    import { Badge } from '@/components/ui/badge';
    import { MapPin, ShieldCheck, Star as StarIcon } from 'lucide-react';

    const ProfileCardComponent = ({ profile, isTopCard, onSwipe, isSwiping }) => {
      const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

      const nextPhoto = (e) => {
        e.stopPropagation();
        setCurrentPhotoIndex((prev) => (prev + 1) % profile.photos.length);
      };
    
      const prevPhoto = (e) => {
        e.stopPropagation();
        setCurrentPhotoIndex((prev) => (prev - 1 + profile.photos.length) % profile.photos.length);
      };

      const handleImageTap = (e) => {
        e.stopPropagation(); 
        const tapTarget = e.target;
        const rect = tapTarget.getBoundingClientRect();
        const tapX = e.clientX - rect.left;
    
        if (tapX < rect.width / 3) {
          prevPhoto(e);
        } else if (tapX > (rect.width * 2) / 3) {
          nextPhoto(e);
        }
      };
      
      const averageRating = profile.mediaSoldRating || 0;

      return (
        <Card className="w-full h-full rounded-xl overflow-hidden shadow-xl bg-slate-900 border-slate-700 flex flex-col select-none">
          <CardHeader className="p-0 relative flex-grow cursor-default" onClick={!isSwiping ? handleImageTap : undefined}>
            <AnimatePresence initial={false} mode="wait">
              <motion.img
                key={profile.id + '-' + currentPhotoIndex}
                src={profile.photos[currentPhotoIndex]}
                alt={`${profile.name}'s photo ${currentPhotoIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0.8, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.8, scale: 1.02 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>
            
            <div className="absolute top-2 left-2 right-2 flex space-x-1 pointer-events-none z-10">
              {profile.photos.map((_, index) => (
                <div key={index} className="h-1 flex-1 rounded-full bg-black/20 overflow-hidden">
                    <motion.div 
                        className="h-full bg-white/80"
                        initial={{ width: '0%'}}
                        animate={{ width: index === currentPhotoIndex ? '100%' : '0%'}}
                        transition={{ duration: index === currentPhotoIndex ? 0.2 : 0, ease: "linear" }}
                    />
                </div>
              ))}
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 pt-16 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white pointer-events-none">
              <div className="flex items-center justify-between mb-1.5">
                <Link 
                  to={`/profile/${profile.id}`} 
                  onClick={(e) => { e.stopPropagation(); if (onSwipe) onSwipe('info'); }}
                  className="pointer-events-auto focus:outline-none focus:ring-2 focus:ring-primary rounded"
                >
                  <h2 className="text-3xl font-bold drop-shadow-md">{profile.name} <span className="font-light text-2xl">{profile.age}</span></h2>
                </Link>
              </div>
              <div className="flex items-center text-sm text-gray-300 mb-1 drop-shadow-sm">
                  <MapPin size={14} className="mr-1.5" /> {profile.city} ({profile.distance})
              </div>
              {currentPhotoIndex === profile.referencePhotoIndex && 
                  <Badge variant="secondary" className="mb-1.5 bg-gradient-to-r from-green-500/80 to-emerald-600/80 text-white text-[10px] px-2 py-0.5 shadow-md backdrop-blur-sm border-none">
                      <ShieldCheck size={11} className="mr-1"/>Photo Vérifiée
                  </Badge>
              }
              {averageRating > 0 && (
                  <div className="flex items-center text-sm text-gray-300 mb-1.5 drop-shadow-sm">
                      <StarIcon size={14} className="mr-1.5 fill-yellow-400 text-yellow-400"/> {averageRating.toFixed(1)} <span className="ml-1">Note Média</span>
                  </div>
              )}
              <p className="text-sm text-gray-200 line-clamp-2 leading-relaxed drop-shadow-sm">{profile.bio}</p>
            </div>
          </CardHeader>
        </Card>
      );
    };

    export default ProfileCardComponent;