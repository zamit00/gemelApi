#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Video Editor Demo
=================
דוגמאות שימוש בעורך הוידאו

This script demonstrates various video editing capabilities.
"""

import os
from pathlib import Path
from video_editor import VideoEditor


def create_sample_video():
    """יצירת וידאו לדוגמה לבדיקות"""
    from moviepy import ColorClip, TextClip, CompositeVideoClip
    
    print("Creating sample video for testing...")
    
    # Create a simple colored background
    background = ColorClip(size=(640, 480), color=(0, 100, 200), duration=10)
    
    # Add some text
    text1 = TextClip("Sample Video", fontsize=50, color='white', font='Arial-Bold')
    text1 = text1.set_position('center').set_duration(5)
    
    text2 = TextClip("For Testing", fontsize=30, color='yellow', font='Arial-Bold')
    text2 = text2.set_position('center').set_start(5).set_duration(5)
    
    # Composite the video
    video = CompositeVideoClip([background, text1, text2])
    
    output_path = "sample_video.mp4"
    video.write_videofile(output_path, fps=24, codec='libx264')
    
    # Clean up
    background.close()
    text1.close()
    text2.close()
    video.close()
    
    print(f"Sample video created: {output_path}")
    return output_path


def demo_basic_operations():
    """הדגמת פעולות בסיסיות"""
    print("\n🎬 Video Editor Demo - הדגמת עורך הוידאו")
    print("=" * 60)
    
    editor = VideoEditor()
    
    # Create sample video if it doesn't exist
    sample_video = "sample_video.mp4"
    if not os.path.exists(sample_video):
        sample_video = create_sample_video()
    
    try:
        print("\n1. 📹 Cutting video segment...")
        cut_video = editor.cut_video(sample_video, 2, 6)
        print(f"   ✅ Cut video saved: {cut_video}")
        
        print("\n2. 📝 Adding text overlay...")
        text_video = editor.add_text(sample_video, "Hello World! שלום עולם!", 
                                   position=(100, 100), fontsize=40, color='red')
        print(f"   ✅ Text video saved: {text_video}")
        
        print("\n3. 📏 Resizing video...")
        resized_video = editor.resize_video(sample_video, 320, 240)
        print(f"   ✅ Resized video saved: {resized_video}")
        
        print("\n4. ⚡ Changing video speed...")
        speed_video = editor.change_speed(sample_video, 1.5)
        print(f"   ✅ Speed video saved: {speed_video}")
        
        print("\n5. 🌅 Adding fade effects...")
        fade_video = editor.add_fade_effect(sample_video, fade_in_duration=2, fade_out_duration=2)
        print(f"   ✅ Fade video saved: {fade_video}")
        
        print("\n6. 🎵 Extracting audio...")
        audio_file = editor.extract_audio(sample_video)
        print(f"   ✅ Audio extracted: {audio_file}")
        
        print("\n✨ All operations completed successfully!")
        print(f"📁 Check the output directory: {editor.output_dir}")
        
    except Exception as e:
        print(f"❌ Error during demo: {e}")


def demo_advanced_operations():
    """הדגמת פעולות מתקדמות"""
    print("\n🚀 Advanced Operations Demo")
    print("=" * 40)
    
    editor = VideoEditor()
    
    # Create sample images for slideshow
    sample_images = create_sample_images()
    
    try:
        print("\n1. 🖼️ Creating slideshow from images...")
        slideshow = editor.create_slideshow(sample_images, duration_per_image=2.0, 
                                          transition_duration=0.5)
        print(f"   ✅ Slideshow created: {slideshow}")
        
        # If we have multiple videos, demonstrate concatenation
        if os.path.exists("sample_video.mp4"):
            cut1 = editor.cut_video("sample_video.mp4", 0, 3, "temp_clip1.mp4")
            cut2 = editor.cut_video("sample_video.mp4", 5, 8, "temp_clip2.mp4")
            
            print("\n2. 🔗 Concatenating video clips...")
            concat_video = editor.concatenate_videos([cut1, cut2])
            print(f"   ✅ Concatenated video: {concat_video}")
            
            # Clean up temp files
            os.remove(cut1)
            os.remove(cut2)
        
        print("\n✨ Advanced operations completed!")
        
    except Exception as e:
        print(f"❌ Error during advanced demo: {e}")


def create_sample_images():
    """יצירת תמונות לדוגמה למצגת"""
    from moviepy import ColorClip, TextClip, CompositeVideoClip
    
    images = []
    colors = [(255, 0, 0), (0, 255, 0), (0, 0, 255), (255, 255, 0)]
    texts = ["Image 1", "Image 2", "Image 3", "Image 4"]
    
    for i, (color, text) in enumerate(zip(colors, texts)):
        # Create colored background
        background = ColorClip(size=(640, 480), color=color, duration=0.1)
        
        # Add text
        text_clip = TextClip(text, fontsize=60, color='white', font='Arial-Bold')
        text_clip = text_clip.set_position('center').set_duration(0.1)
        
        # Composite
        frame = CompositeVideoClip([background, text_clip])
        
        # Save as image
        image_path = f"sample_image_{i+1}.png"
        frame.save_frame(image_path, t=0)
        images.append(image_path)
        
        # Clean up
        background.close()
        text_clip.close()
        frame.close()
    
    return images


def show_usage_examples():
    """הצגת דוגמאות שימוש"""
    print("\n📚 Usage Examples - דוגמאות שימוש")
    print("=" * 50)
    
    examples = [
        {
            "title": "Cut video segment",
            "description": "חיתוך קטע וידאו מהשנייה ה-10 עד ה-30",
            "code": "python video_editor.py --input video.mp4 --operation cut --start 10 --end 30"
        },
        {
            "title": "Add text overlay", 
            "description": "הוספת טקסט לוידאו",
            "code": "python video_editor.py --input video.mp4 --operation text --text 'Hello World' --position 100 100"
        },
        {
            "title": "Resize video",
            "description": "שינוי רזולוציה ל-720p",
            "code": "python video_editor.py --input video.mp4 --operation resize --width 1280 --height 720"
        },
        {
            "title": "Change speed",
            "description": "הגדלת מהירות פי 2",
            "code": "python video_editor.py --input video.mp4 --operation speed --speed 2.0"
        },
        {
            "title": "Add fade effects",
            "description": "הוספת אפקטי fade",
            "code": "python video_editor.py --input video.mp4 --operation fade --fade-in 2 --fade-out 2"
        },
        {
            "title": "Extract audio",
            "description": "חילוץ אודיו מוידאו",
            "code": "python video_editor.py --input video.mp4 --operation audio"
        },
        {
            "title": "Create slideshow",
            "description": "יצירת מצגת מתמונות",
            "code": "python video_editor.py --operation slideshow --images img1.jpg img2.jpg img3.jpg --duration 3"
        }
    ]
    
    for i, example in enumerate(examples, 1):
        print(f"\n{i}. {example['title']}")
        print(f"   {example['description']}")
        print(f"   $ {example['code']}")


def interactive_demo():
    """מצב אינטראקטיבי"""
    print("\n🎮 Interactive Demo Mode")
    print("=" * 30)
    
    while True:
        print("\nChoose an operation:")
        print("1. Run basic demo")
        print("2. Run advanced demo") 
        print("3. Show usage examples")
        print("4. Create sample video")
        print("5. Exit")
        
        try:
            choice = input("\nEnter your choice (1-5): ").strip()
            
            if choice == "1":
                demo_basic_operations()
            elif choice == "2":
                demo_advanced_operations()
            elif choice == "3":
                show_usage_examples()
            elif choice == "4":
                create_sample_video()
            elif choice == "5":
                print("👋 Goodbye!")
                break
            else:
                print("❌ Invalid choice. Please try again.")
                
        except KeyboardInterrupt:
            print("\n👋 Goodbye!")
            break
        except Exception as e:
            print(f"❌ Error: {e}")


if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1 and sys.argv[1] == "--basic":
        demo_basic_operations()
    elif len(sys.argv) > 1 and sys.argv[1] == "--advanced":
        demo_advanced_operations()
    elif len(sys.argv) > 1 and sys.argv[1] == "--examples":
        show_usage_examples()
    else:
        interactive_demo()