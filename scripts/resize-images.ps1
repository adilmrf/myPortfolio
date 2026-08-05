# Resizes the oversized site images in place.
#
# `images.unoptimized: true` is required for the static export, so next/image
# does no resizing at all — whatever is committed is what visitors download.
# The header avatar was 856x841 (250 KB) for a 32 px slot, and the hero
# headshot 1486x1730 (250 KB) for a 176 px slot.
#
# Run from the repo root:  powershell -ExecutionPolicy Bypass -File scripts/resize-images.ps1

Add-Type -AssemblyName System.Drawing

function Resize-Image {
    param(
        [string]$Source,
        [string]$Destination,
        [int]$MaxDimension,
        [string]$Format = "jpeg",
        [int]$Quality = 82
    )

    $srcFull = (Resolve-Path $Source).Path
    $before = [math]::Round((Get-Item $srcFull).Length / 1KB, 1)

    $src = [System.Drawing.Image]::FromFile($srcFull)
    $scale = [Math]::Min($MaxDimension / $src.Width, $MaxDimension / $src.Height)
    if ($scale -gt 1) { $scale = 1 }
    $w = [int][Math]::Round($src.Width * $scale)
    $h = [int][Math]::Round($src.Height * $scale)

    $bmp = New-Object System.Drawing.Bitmap $w, $h
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Flatten onto white for JPEG so any alpha channel does not turn black.
    if ($Format -eq "jpeg") { $g.Clear([System.Drawing.Color]::White) }
    $g.DrawImage($src, 0, 0, $w, $h)

    # Save to a temp file first: GDI+ holds a lock on the source for the
    # lifetime of the Image object, so writing back to the same path fails.
    $tmp = [System.IO.Path]::GetTempFileName()
    if ($Format -eq "jpeg") {
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
            Where-Object { $_.MimeType -eq "image/jpeg" }
        $params = New-Object System.Drawing.Imaging.EncoderParameters 1
        $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
            [System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)
        $bmp.Save($tmp, $codec, $params)
    } else {
        $bmp.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png)
    }

    $g.Dispose(); $bmp.Dispose(); $src.Dispose()

    Move-Item -Path $tmp -Destination $Destination -Force
    $after = [math]::Round((Get-Item $Destination).Length / 1KB, 1)
    "{0,-40} {1}x{2}  {3} KB -> {4} KB" -f (Split-Path $Destination -Leaf), $w, $h, $before, $after
}

Write-Output "-- hero and avatar --"
Resize-Image -Source "public/media/headshot.jpeg" -Destination "public/media/headshot.jpeg" -MaxDimension 512 -Format jpeg -Quality 82
Resize-Image -Source "public/media/am.png" -Destination "public/media/am.png" -MaxDimension 96 -Format png

Write-Output ""
Write-Output "-- logos: .jfif is a non-standard extension; re-encode as .jpg --"
foreach ($name in @("besomi_logo", "nwps", "orbitworks")) {
    $src = "public/media/logos/$name.jfif"
    if (Test-Path $src) {
        Resize-Image -Source $src -Destination "public/media/logos/$name.jpg" -MaxDimension 128 -Format jpeg -Quality 85
        Remove-Item $src
    }
}

Write-Output ""
Write-Output "-- logos: cap the rest at 128 px --"
foreach ($f in Get-ChildItem "public/media/logos" -File) {
    $img = [System.Drawing.Image]::FromFile($f.FullName)
    $tooBig = $img.Width -gt 128 -or $img.Height -gt 128
    $img.Dispose()
    if ($tooBig) {
        $fmt = if ($f.Extension -eq ".png") { "png" } else { "jpeg" }
        Resize-Image -Source $f.FullName -Destination $f.FullName -MaxDimension 128 -Format $fmt -Quality 85
    }
}
