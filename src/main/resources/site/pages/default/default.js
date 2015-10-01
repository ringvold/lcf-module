var thymeleaf = require('/lib/xp/thymeleaf');
var contentLib = require('/lib/xp/content'); // Import the content service functions
var portal = require('/lib/xp/portal'); // Import the portal functions
var menu = require('/lib/enonic/menu/menu');


exports.get = function(req) {

  var site = portal.getSite();
  var content = portal.getContent();

  var menuItems = menu.getMenuTree(3);

  var siteConfig = site.data.siteConfig;

  // Google Analytics
  var googleUATrackingId = siteConfig.config['googleUATrackingId'] || null;
  var facebookAppId = siteConfig.config['facebookAppId'] || null;

  // Contact page URL (for footer)
  var contactPageUrl = siteConfig.config['contactPage'] ? portal.pageUrl({id: siteConfig.config['contactPage']}) : '#';

  // Defines whether page header is layered or not
  var headerType = content.page.config['headerType'] ? content.page.config['headerType'] : 'default';

  // Head title
  var pageTitle = content['displayName'];

  var pageHead = content['displayName'] + ' - ' + site['displayName'];

  // Open Graph Metadata
  var openGraph = {
      'og:title': content['displayName'],
      'og:site_name': site['displayName'],
      // 'og:url': null,
      // 'og:image': portal.assetUrl({ path: 'img/og-enonic-logo.png' })
  };

  var mainRegion   = content.page.regions["main"];
  var footerRegion = content.page.regions["footer"];

  var params = {
      siteTitle: site['displayName'],
      mainRegion: mainRegion,
      footerRegion: footerRegion,
      sitePath: site['_path'],
      siteConfig: siteConfig,
      menuItems: menuItems,
      headerType: headerType,
      googleUATrackingId: googleUATrackingId,
      facebookAppId: facebookAppId,
      pageTitle: pageTitle,
      pageHead: pageHead,
      openGraph: openGraph
  };

  var view = resolve('default.html');

  return {
    body: thymeleaf.render(view, params)
  }
};