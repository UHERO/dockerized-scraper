const assert = require('assert');

const cheerio = require('cheerio');

const PropertyScraper = require('../property-scraper');

const scraper = new PropertyScraper(
  process.env.MONGO_URL,
  process.env.MONGO_USER,
  process.env.MONGO_PASS,
  'HonoluluProperty',
  'hnl_county_data',
  'badTMKs',
);


describe('PropertyScraper', () => {
  describe('#parseOwner()', () => {
    it('', () => {
      const table = `<table class="table_class">
<tr><td class="table_header" colspan="4"> Owner and Parcel Information&nbsp;<a href="hi_honolulu_owner_print.php?KEY=230170130000" target="new"><font size=-2>Print Owner Info</font></a></td></tr><tr><td class="owner_header"> Parcel Number </td><td class="owner_value">&nbsp;230170130000&nbsp;</td><td class="owner_header">Data current as of&nbsp; </td><td class="owner_value">&nbsp;February 12, 2018&nbsp;</td></tr>
<tr><td class="owner_header">  Owner Name <!--<BR><font color="#FF0000">Owner Name as of October 1, 2014</font>--></td>
<td class="owner_value">&nbsp;KAPIOLANI TERRACE  Fee Owner<br></td><td class="owner_header">Project Name</td><td class="owner_value">&nbsp;KAPIOLANI TERRACE&nbsp;</td></tr><tr><td class="owner_header">Location Address</td><td class="owner_value">&nbsp;1560 KANUNU ST&nbsp;</td><td class="owner_header">Plat Map</td><td class="owner_value"><A href="/hi_honolulu_plats/o23017.pdf" target="new"><img src="images/hi_pmp.gif"></A>&nbsp;</td></tr>
<tr><td class="owner_header">Property Class&nbsp;</td><td class="owner_value">&nbsp;&nbsp;RESIDENTIAL</td><td class="owner_header">Parcel Map</td><td class="owner_value"><a href="http://qpublic9.qpublic.net/qpmap4/map.php?county=hi_honolulu&parcel=230170130000&extent=-17570793+2426918+-17570429+2427242&layers=parcels+ghybrid+parcels2" class="image"><img src="/images/hi_gpm.gif" border=0></a><tr><td class="owner_header">Land Area (approximate sq ft)</td><td class="owner_value">&nbsp;33,644&nbsp;</td><td class="owner_header" colspan=2 rowspan=2 valign="top"><table class="table_sketch"><tr class="sketch"><td class="sketch_main"><B>Legal Information</B></td></tr><tr class="sketch"><td class="sketch_main">&nbsp;</tr>
</table></td></tr>
<tr><td class="owner_header">Land Area (acres)</td><td class="owner_value">&nbsp;0.7724&nbsp;</td></tr>
<tr><td class="owner_header">Condo Information</td><td class="owner_value" colspan="3">&nbsp;This is a Condo Master Non-Taxable Parcel.  Individual Assessments are found on units below.</td></tr>
</table></body></html>`;
      const $ = cheerio.load(table);
      const tag = $('table[class=table_class]');
      // console.log(tag.html());
      const firstKey = PropertyScraper.camelize('  Owner Name');
      assert.equal(scraper.parseOwner($, tag)[firstKey], 'KAPIOLANI TERRACE  Fee Owner');
    });
  });

  describe('#camelize', () => {
    it('first character should be lowercase with leading spaces', () => {
      assert.equal(PropertyScraper.camelize('  Owner Name'), 'ownerName');
    });
  });
});
