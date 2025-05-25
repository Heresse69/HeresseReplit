import React from 'react';
    import { motion, useTransform } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import { X, Heart, Rewind, Star as SuperlikeIcon, Zap } from 'lucide-react';
    import { useToast } from '@/components/ui/use-toast';

    const ActionButton = ({ icon: Icon, label, onClick, disabled, className, motionStyle, ariaLabel }) => (
        <motion.div style={motionStyle}>
            <Button
                variant="outline"
                size="icon"
                className={className}
                onClick={onClick}
                disabled={disabled}
                aria-label={ariaLabel}
            >
                <Icon size={label === 'main' ? 34 : 24} strokeWidth={label === 'main' ? 2.5 : 2} fill={label === 'like' ? "currentColor" : "none"} />
            </Button>
        </motion.div>
    );


    const ActionButtons = ({ onRewind, onSwipe, onBoost, canRewind, canSuperlike, canBoost, isSwiping, historyLength, motionX }) => {
      const { toast } = useToast();

      const dislikeOpacity = useTransform(motionX, [-80, 0], [1, 0.7]);
      const dislikeScale = useTransform(motionX, [-80, 0], [1.15, 1]);
      const likeOpacity = useTransform(motionX, [0, 80], [0.7, 1]);
      const likeScale = useTransform(motionX, [0, 80], [1, 1.15]);
    
      return (
        <div className="absolute bottom-0 left-0 right-0 flex justify-evenly items-center py-4 px-3 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10">
            <ActionButton
                icon={X}
                label="main"
                onClick={() => onSwipe('left')}
                disabled={isSwiping && motionX.get() > 0}
                className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-gradient-to-br from-rose-500/80 to-red-600/80 hover:from-rose-500 hover:to-red-600 border-2 border-rose-400/70 text-white shadow-2xl backdrop-blur-md transition-all duration-150 ease-out hover:shadow-rose-500/40 active:scale-95"
                motionStyle={{ opacity: isSwiping ? dislikeOpacity : 1, scale: isSwiping ? dislikeScale : 1 }}
                ariaLabel="Dislike profile"
            />

            <ActionButton
                icon={Rewind}
                onClick={onRewind}
                disabled={!canRewind || historyLength === 0 || isSwiping}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/20 border-yellow-500/80 text-yellow-500 hover:text-yellow-400 shadow-xl backdrop-blur-sm"
                ariaLabel="Rewind last swipe"
            />
            
            <ActionButton
                icon={SuperlikeIcon}
                onClick={() => onSwipe('superlike')}
                disabled={!canSuperlike || isSwiping}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/20 border-blue-500/80 text-blue-500 hover:text-blue-400 shadow-xl backdrop-blur-sm"
                ariaLabel="Superlike profile"
            />

            <ActionButton
                icon={Heart}
                label="like"
                onClick={() => onSwipe('right')}
                disabled={isSwiping && motionX.get() < 0}
                className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-gradient-to-br from-emerald-500/80 to-green-600/80 hover:from-emerald-500 hover:to-green-600 border-2 border-emerald-400/70 text-white shadow-2xl backdrop-blur-md transition-all duration-150 ease-out hover:shadow-emerald-500/40 active:scale-95"
                motionStyle={{ opacity: isSwiping ? likeOpacity : 1, scale: isSwiping ? likeScale : 1 }}
                ariaLabel="Like profile"
            />
            
            <ActionButton
                icon={Zap}
                onClick={() => { onBoost(); toast({title: "Boost (Non implémenté)"}) }}
                disabled={!canBoost || isSwiping}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/20 border-purple-500/80 text-purple-500 hover:text-purple-400 shadow-xl backdrop-blur-sm"
                ariaLabel="Boost profile"
            />
        </div>
      );
    };

    export default ActionButtons;