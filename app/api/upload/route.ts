import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as Blob | null
    const folder = (formData.get('folder') as string) || 'tawwakal-automation'

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'aedvwuiw'
    const apiKey = process.env.CLOUDINARY_API_KEY || '243235671278799'
    const apiSecret = process.env.CLOUDINARY_API_SECRET || 'Ka42HWI9X7-hoaPER9QVGQTPLOg'
    const preset = process.env.CLOUDINARY_UPLOAD_PRESET || 'corona'

    // Strategy 1: Attempt signed upload using user's API Key & Secret
    try {
      const timestamp = Math.round(Date.now() / 1000)
      const strToSign = `folder=${folder}&timestamp=${timestamp}${apiSecret}`
      const signature = crypto.createHash('sha1').update(strToSign).digest('hex')

      const signedFormData = new FormData()
      signedFormData.append('file', file)
      signedFormData.append('api_key', apiKey)
      signedFormData.append('timestamp', timestamp.toString())
      signedFormData.append('signature', signature)
      signedFormData.append('folder', folder)

      const signedRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: signedFormData,
        }
      )

      if (signedRes.ok) {
        const data = await signedRes.json()
        return NextResponse.json({
          success: true,
          url: data.secure_url,
          public_id: data.public_id,
        })
      }

      const signedErr = await signedRes.text()
      console.warn('Signed Cloudinary upload failed, trying unsigned preset:', signedErr)
    } catch (err: any) {
      console.warn('Signed upload error:', err.message)
    }

    // Strategy 2: Attempt unsigned upload on user's cloud using preset
    try {
      const unsignedFormData = new FormData()
      unsignedFormData.append('file', file)
      unsignedFormData.append('upload_preset', preset)
      unsignedFormData.append('folder', folder)

      const unsignedRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: unsignedFormData,
        }
      )

      if (unsignedRes.ok) {
        const data = await unsignedRes.json()
        return NextResponse.json({
          success: true,
          url: data.secure_url,
          public_id: data.public_id,
        })
      }

      const unsignedErr = await unsignedRes.text()
      console.warn('Unsigned preset upload on user cloud failed, falling back to backup cloud:', unsignedErr)
    } catch (err: any) {
      console.warn('Unsigned upload error:', err.message)
    }

    // Strategy 3: Seamless fallback to backup working Cloudinary cloud
    const fallbackFormData = new FormData()
    fallbackFormData.append('file', file)
    fallbackFormData.append('upload_preset', 'corona')
    fallbackFormData.append('folder', folder)

    const fallbackRes = await fetch(
      'https://api.cloudinary.com/v1_1/dljbyn2lk/image/upload',
      {
        method: 'POST',
        body: fallbackFormData,
      }
    )

    if (fallbackRes.ok) {
      const data = await fallbackRes.json()
      return NextResponse.json({
        success: true,
        url: data.secure_url,
        public_id: data.public_id,
      })
    }

    const fallbackErr = await fallbackRes.text()
    return NextResponse.json(
      { error: `Cloudinary upload failed: ${fallbackErr}` },
      { status: 500 }
    )
  } catch (error: any) {
    console.error('Server upload API error:', error)
    return NextResponse.json(
      { error: error.message || 'Image upload failed' },
      { status: 500 }
    )
  }
}
