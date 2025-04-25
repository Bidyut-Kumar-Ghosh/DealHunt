import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useVideoPlayer } from 'expo-video';

type VideoContextType = {
    videoPlayer: ReturnType<typeof useVideoPlayer>;
    showVideo: boolean;
    setShowVideo: (show: boolean) => void;
    playVideo: () => void;
};

const VideoContext = createContext<VideoContextType | null>(null);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
    const [showVideo, setShowVideo] = useState(true);

    const videoPlayer = useVideoPlayer(require('@/assets/images/Kifa.mp4'), (player) => {
        player.volume = 1.0;
        player.loop = false;
        player.play();
    });

    // Auto-hide video after 3 seconds
    useEffect(() => {
        if (showVideo) {
            const timer = setTimeout(() => {
                setShowVideo(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showVideo]);

    const playVideo = () => {
        setShowVideo(true);
        videoPlayer.currentTime = 0;
        videoPlayer.play();
    };

    return (
        <VideoContext.Provider value={{ videoPlayer, showVideo, setShowVideo, playVideo }}>
            {children}
        </VideoContext.Provider>
    );
};

export const useVideo = () => {
    const context = useContext(VideoContext);
    if (!context) {
        throw new Error('useVideo must be used within a VideoProvider');
    }
    return context;
}; 