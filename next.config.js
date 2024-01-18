/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {hostname:"*.googleusercontent"}
        ]
    }
}

module.exports = nextConfig
