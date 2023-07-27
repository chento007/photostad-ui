/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:["photostad-api.istad.co"],
        remotePatterns:[
            {
                hostname:"photostad-api.istad.co",
                protocol:"https"
                
            }
        ]

    },
    env:{
        NEXTAUTH_SECRET:"b99cd5ceb23e9dd4b8ae53af0059e24b",
        GOOGLE_CLIENT_ID:"950666114840-6fhkd3be5im1iar7vlfemlmcdh4dv7od.apps.googleusercontent.com",
        GOOGLE_CLIENT_SECRET:"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",
        NEXTAUTH_URL:"https://photostad.istad.co"
        // NEXTAUTH_URL:"http://localhost:3000"
    }
    
}

module.exports = nextConfig
