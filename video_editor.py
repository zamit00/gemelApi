#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Video Editor Script
===================
סקריפט מקיף לעריכת וידאו עם יכולות מתקדמות

Features:
- חיתוך וחיבור קטעי וידאו
- הוספת טקסט וכתוביות
- שינוי רזולוציה ומהירות
- הוספת אפקטים ומעברים
- עיבוד אצווה של קבצים
- המרת פורמטים
"""

import os
import sys
from pathlib import Path
from typing import List, Tuple, Optional, Union
import argparse

try:
    from moviepy import (
        VideoFileClip, AudioFileClip, ImageClip, TextClip,
        concatenate_videoclips, CompositeVideoClip, 
        vfx, afx, ColorClip
    )
    import cv2
    import numpy as np
except ImportError as e:
    print(f"Error importing required libraries: {e}")
    print("Please install: pip install moviepy opencv-python")
    sys.exit(1)


class VideoEditor:
    """מחלקה לעריכת וידאו מתקדמת"""
    
    def __init__(self):
        self.clips = []
        self.output_dir = Path("./output")
        self.output_dir.mkdir(exist_ok=True)
    
    def load_video(self, video_path: str) -> VideoFileClip:
        """טעינת קובץ וידאו"""
        if not os.path.exists(video_path):
            raise FileNotFoundError(f"Video file not found: {video_path}")
        
        print(f"Loading video: {video_path}")
        clip = VideoFileClip(video_path)
        print(f"Duration: {clip.duration:.2f}s, Size: {clip.size}, FPS: {clip.fps}")
        return clip
    
    def cut_video(self, video_path: str, start_time: float, end_time: float, 
                  output_path: Optional[str] = None) -> str:
        """חיתוך קטע וידאו"""
        clip = self.load_video(video_path)
        
        if start_time < 0 or end_time > clip.duration or start_time >= end_time:
            raise ValueError("Invalid time range")
        
        cut_clip = clip.subclip(start_time, end_time)
        
        if not output_path:
            name = Path(video_path).stem
            output_path = str(self.output_dir / f"{name}_cut_{start_time}-{end_time}.mp4")
        
        print(f"Cutting video from {start_time}s to {end_time}s...")
        cut_clip.write_videofile(output_path, codec='libx264', audio_codec='aac')
        cut_clip.close()
        clip.close()
        
        print(f"Cut video saved: {output_path}")
        return output_path
    
    def concatenate_videos(self, video_paths: List[str], output_path: Optional[str] = None) -> str:
        """חיבור מספר קטעי וידאו"""
        clips = []
        for path in video_paths:
            clip = self.load_video(path)
            clips.append(clip)
        
        final_clip = concatenate_videoclips(clips, method="compose")
        
        if not output_path:
            output_path = str(self.output_dir / "concatenated_video.mp4")
        
        print(f"Concatenating {len(clips)} videos...")
        final_clip.write_videofile(output_path, codec='libx264', audio_codec='aac')
        
        # Clean up
        for clip in clips:
            clip.close()
        final_clip.close()
        
        print(f"Concatenated video saved: {output_path}")
        return output_path
    
    def add_text(self, video_path: str, text: str, position: Tuple[int, int] = (50, 50),
                 duration: Optional[float] = None, fontsize: int = 50, 
                 color: str = 'white', output_path: Optional[str] = None) -> str:
        """הוספת טקסט לוידאו"""
        clip = self.load_video(video_path)
        
        if duration is None:
            duration = clip.duration
        
        # Create text clip
        text_clip = TextClip(text, fontsize=fontsize, color=color, font='Arial-Bold')
        text_clip = text_clip.set_position(position).set_duration(duration)
        
        # Composite video with text
        final_clip = CompositeVideoClip([clip, text_clip])
        
        if not output_path:
            name = Path(video_path).stem
            output_path = str(self.output_dir / f"{name}_with_text.mp4")
        
        print(f"Adding text: '{text}' to video...")
        final_clip.write_videofile(output_path, codec='libx264', audio_codec='aac')
        
        # Clean up
        clip.close()
        text_clip.close()
        final_clip.close()
        
        print(f"Video with text saved: {output_path}")
        return output_path
    
    def resize_video(self, video_path: str, width: int, height: int, 
                     output_path: Optional[str] = None) -> str:
        """שינוי רזולוציה של וידאו"""
        clip = self.load_video(video_path)
        
        resized_clip = clip.resize(newsize=(width, height))
        
        if not output_path:
            name = Path(video_path).stem
            output_path = str(self.output_dir / f"{name}_resized_{width}x{height}.mp4")
        
        print(f"Resizing video to {width}x{height}...")
        resized_clip.write_videofile(output_path, codec='libx264', audio_codec='aac')
        
        # Clean up
        clip.close()
        resized_clip.close()
        
        print(f"Resized video saved: {output_path}")
        return output_path
    
    def change_speed(self, video_path: str, speed_factor: float, 
                     output_path: Optional[str] = None) -> str:
        """שינוי מהירות וידאו"""
        clip = self.load_video(video_path)
        
        if speed_factor <= 0:
            raise ValueError("Speed factor must be positive")
        
        speed_clip = clip.fx(vfx.speedx, speed_factor)
        
        if not output_path:
            name = Path(video_path).stem
            output_path = str(self.output_dir / f"{name}_speed_{speed_factor}x.mp4")
        
        print(f"Changing video speed by {speed_factor}x...")
        speed_clip.write_videofile(output_path, codec='libx264', audio_codec='aac')
        
        # Clean up
        clip.close()
        speed_clip.close()
        
        print(f"Speed-changed video saved: {output_path}")
        return output_path
    
    def add_fade_effect(self, video_path: str, fade_in_duration: float = 1.0, 
                        fade_out_duration: float = 1.0, output_path: Optional[str] = None) -> str:
        """הוספת אפקט fade in/out"""
        clip = self.load_video(video_path)
        
        # Apply fade effects
        faded_clip = clip.fadein(fade_in_duration).fadeout(fade_out_duration)
        
        if not output_path:
            name = Path(video_path).stem
            output_path = str(self.output_dir / f"{name}_with_fade.mp4")
        
        print(f"Adding fade effects (in: {fade_in_duration}s, out: {fade_out_duration}s)...")
        faded_clip.write_videofile(output_path, codec='libx264', audio_codec='aac')
        
        # Clean up
        clip.close()
        faded_clip.close()
        
        print(f"Video with fade effects saved: {output_path}")
        return output_path
    
    def extract_audio(self, video_path: str, output_path: Optional[str] = None) -> str:
        """חילוץ אודיו מוידאו"""
        clip = self.load_video(video_path)
        
        if not output_path:
            name = Path(video_path).stem
            output_path = str(self.output_dir / f"{name}_audio.mp3")
        
        print("Extracting audio...")
        audio = clip.audio
        audio.write_audiofile(output_path)
        
        # Clean up
        audio.close()
        clip.close()
        
        print(f"Audio extracted: {output_path}")
        return output_path
    
    def add_background_music(self, video_path: str, audio_path: str, 
                            volume: float = 0.5, output_path: Optional[str] = None) -> str:
        """הוספת מוזיקת רקע"""
        video_clip = self.load_video(video_path)
        audio_clip = AudioFileClip(audio_path)
        
        # Adjust audio duration to match video
        if audio_clip.duration > video_clip.duration:
            audio_clip = audio_clip.subclip(0, video_clip.duration)
        else:
            # Loop audio if it's shorter than video
            loops_needed = int(video_clip.duration / audio_clip.duration) + 1
            audio_clip = concatenate_videoclips([audio_clip] * loops_needed).subclip(0, video_clip.duration)
        
        # Adjust volume
        audio_clip = audio_clip.fx(afx.volumex, volume)
        
        # Combine original audio with background music
        if video_clip.audio:
            final_audio = CompositeAudioClip([video_clip.audio, audio_clip])
        else:
            final_audio = audio_clip
        
        final_clip = video_clip.set_audio(final_audio)
        
        if not output_path:
            name = Path(video_path).stem
            output_path = str(self.output_dir / f"{name}_with_music.mp4")
        
        print("Adding background music...")
        final_clip.write_videofile(output_path, codec='libx264', audio_codec='aac')
        
        # Clean up
        video_clip.close()
        audio_clip.close()
        final_clip.close()
        
        print(f"Video with background music saved: {output_path}")
        return output_path
    
    def create_slideshow(self, image_paths: List[str], duration_per_image: float = 3.0,
                        transition_duration: float = 0.5, output_path: Optional[str] = None) -> str:
        """יצירת מצגת מתמונות"""
        clips = []
        
        for i, img_path in enumerate(image_paths):
            if not os.path.exists(img_path):
                print(f"Warning: Image not found: {img_path}")
                continue
            
            # Create image clip
            img_clip = ImageClip(img_path, duration=duration_per_image)
            
            # Add fade transition
            if i > 0:
                img_clip = img_clip.fadein(transition_duration)
            if i < len(image_paths) - 1:
                img_clip = img_clip.fadeout(transition_duration)
            
            clips.append(img_clip)
        
        if not clips:
            raise ValueError("No valid images found")
        
        # Concatenate all clips
        final_clip = concatenate_videoclips(clips, method="compose")
        
        if not output_path:
            output_path = str(self.output_dir / "slideshow.mp4")
        
        print(f"Creating slideshow from {len(clips)} images...")
        final_clip.write_videofile(output_path, codec='libx264', fps=24)
        
        # Clean up
        for clip in clips:
            clip.close()
        final_clip.close()
        
        print(f"Slideshow saved: {output_path}")
        return output_path
    
    def batch_process(self, input_dir: str, operation: str, **kwargs):
        """עיבוד אצווה של קבצי וידאו"""
        input_path = Path(input_dir)
        if not input_path.exists():
            raise FileNotFoundError(f"Input directory not found: {input_dir}")
        
        video_extensions = ['.mp4', '.avi', '.mov', '.mkv', '.wmv', '.flv']
        video_files = []
        
        for ext in video_extensions:
            video_files.extend(input_path.glob(f"*{ext}"))
            video_files.extend(input_path.glob(f"*{ext.upper()}"))
        
        if not video_files:
            print("No video files found in the directory")
            return
        
        print(f"Found {len(video_files)} video files for batch processing")
        
        for video_file in video_files:
            try:
                print(f"\nProcessing: {video_file.name}")
                
                if operation == "resize":
                    self.resize_video(str(video_file), **kwargs)
                elif operation == "cut":
                    self.cut_video(str(video_file), **kwargs)
                elif operation == "speed":
                    self.change_speed(str(video_file), **kwargs)
                elif operation == "fade":
                    self.add_fade_effect(str(video_file), **kwargs)
                else:
                    print(f"Unknown operation: {operation}")
                    
            except Exception as e:
                print(f"Error processing {video_file.name}: {e}")
        
        print("\nBatch processing completed!")


def main():
    """פונקציה ראשית עם ממשק שורת פקודה"""
    parser = argparse.ArgumentParser(description="Video Editor Script - עורך וידאו מתקדם")
    parser.add_argument("--input", "-i", required=True, help="Input video file or directory")
    parser.add_argument("--output", "-o", help="Output file path")
    parser.add_argument("--operation", "-op", required=True, 
                       choices=["cut", "concat", "text", "resize", "speed", "fade", "audio", "music", "slideshow", "batch"],
                       help="Operation to perform")
    
    # Operation-specific arguments
    parser.add_argument("--start", type=float, help="Start time for cutting (seconds)")
    parser.add_argument("--end", type=float, help="End time for cutting (seconds)")
    parser.add_argument("--text", help="Text to add to video")
    parser.add_argument("--position", nargs=2, type=int, default=[50, 50], help="Text position (x y)")
    parser.add_argument("--width", type=int, help="New width for resizing")
    parser.add_argument("--height", type=int, help="New height for resizing")
    parser.add_argument("--speed", type=float, help="Speed factor (e.g., 2.0 for 2x speed)")
    parser.add_argument("--fade-in", type=float, default=1.0, help="Fade in duration")
    parser.add_argument("--fade-out", type=float, default=1.0, help="Fade out duration")
    parser.add_argument("--audio", help="Audio file for background music")
    parser.add_argument("--volume", type=float, default=0.5, help="Background music volume")
    parser.add_argument("--images", nargs="+", help="Image files for slideshow")
    parser.add_argument("--duration", type=float, default=3.0, help="Duration per image in slideshow")
    
    args = parser.parse_args()
    
    editor = VideoEditor()
    
    try:
        if args.operation == "cut":
            if not args.start or not args.end:
                print("Error: --start and --end times are required for cutting")
                return
            editor.cut_video(args.input, args.start, args.end, args.output)
            
        elif args.operation == "text":
            if not args.text:
                print("Error: --text is required for adding text")
                return
            editor.add_text(args.input, args.text, tuple(args.position), output_path=args.output)
            
        elif args.operation == "resize":
            if not args.width or not args.height:
                print("Error: --width and --height are required for resizing")
                return
            editor.resize_video(args.input, args.width, args.height, args.output)
            
        elif args.operation == "speed":
            if not args.speed:
                print("Error: --speed factor is required")
                return
            editor.change_speed(args.input, args.speed, args.output)
            
        elif args.operation == "fade":
            editor.add_fade_effect(args.input, args.fade_in, args.fade_out, args.output)
            
        elif args.operation == "audio":
            editor.extract_audio(args.input, args.output)
            
        elif args.operation == "music":
            if not args.audio:
                print("Error: --audio file is required for background music")
                return
            editor.add_background_music(args.input, args.audio, args.volume, args.output)
            
        elif args.operation == "slideshow":
            if not args.images:
                print("Error: --images are required for slideshow")
                return
            editor.create_slideshow(args.images, args.duration, output_path=args.output)
            
        elif args.operation == "batch":
            print("Batch processing not implemented in CLI yet")
            
    except Exception as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    if len(sys.argv) == 1:
        # Interactive mode
        print("🎬 Video Editor - עורך וידאו מתקדם")
        print("=" * 50)
        print("Available operations:")
        print("1. Cut video segment")
        print("2. Concatenate videos") 
        print("3. Add text overlay")
        print("4. Resize video")
        print("5. Change video speed")
        print("6. Add fade effects")
        print("7. Extract audio")
        print("8. Add background music")
        print("9. Create slideshow")
        print("10. Batch processing")
        print("\nFor command line usage, run with --help")
        
        editor = VideoEditor()
        print(f"\nOutput directory: {editor.output_dir}")
        
    else:
        main()