/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
const nextConfig = {};
const withNextIntl = createNextIntlPlugin();
/** @type {import('next').NextConfig} */

export default withNextIntl(nextConfig);
