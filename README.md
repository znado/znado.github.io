This is the website of [Zachary Nado](http://zna.do/).

### Setup
```
sudo apt-get install jekyll
bundle install --path vendor/bundle
bundle exec jekyll serve
```

### EQUiSAT video generation
```
ffmpeg -i MOV_0007.MP4 -ss 00:00:08 -t 00:00:37 -async 1 cut.mp4
ffmpeg -i cut.mp4 -movflags faststart -an -vcodec copy mute.mp4
ffmpeg -i mute.mp4 -filter:v "crop=1080:1080:700:0" cropped.mp4
ffmpeg -i cropped.mp4 -preset slow -b:v 370K small.mp4
```

<!-- In Sublime, ctrl+alt+shift+l to hyperlink text with clipboard content as href URL -->