param(
    [Parameter(Mandatory = $true)]
    [ValidatePattern('^https://')]
    [string]$BaseUrl
)

$base = $BaseUrl.TrimEnd('/')
$today = Get-Date -Format 'yyyy-MM-dd'
$pages = @(
    @{ Path = '/'; Priority = '1.0'; Frequency = 'weekly' },
    @{ Path = '/products/self-locking-washer.html'; Priority = '0.9'; Frequency = 'monthly' },
    @{ Path = '/technology.html'; Priority = '0.8'; Frequency = 'monthly' },
    @{ Path = '/quality.html'; Priority = '0.8'; Frequency = 'monthly' },
    @{ Path = '/applications.html'; Priority = '0.7'; Frequency = 'monthly' },
    @{ Path = '/about.html'; Priority = '0.6'; Frequency = 'monthly' },
    @{ Path = '/resources.html'; Priority = '0.6'; Frequency = 'monthly' },
    @{ Path = '/contact.html'; Priority = '0.6'; Frequency = 'monthly' }
)

$urls = foreach ($page in $pages) {
    @"
  <url>
    <loc>$base$($page.Path)</loc>
    <lastmod>$today</lastmod>
    <changefreq>$($page.Frequency)</changefreq>
    <priority>$($page.Priority)</priority>
  </url>
"@
}

$sitemap = @"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
$($urls -join "`n")
</urlset>
"@

$sitemapPath = Join-Path $PSScriptRoot '..\sitemap.xml'
$sitemap | Set-Content -LiteralPath $sitemapPath -Encoding UTF8

$robotsPath = Join-Path $PSScriptRoot '..\robots.txt'
$robots = @"
User-agent: *
Allow: /

Sitemap: $base/sitemap.xml
"@
$robots | Set-Content -LiteralPath $robotsPath -Encoding UTF8

Write-Output "Generated sitemap.xml and updated robots.txt for $base"
