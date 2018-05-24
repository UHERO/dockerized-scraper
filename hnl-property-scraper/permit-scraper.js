var casper = require('casper').create({

  stepTimeout: 30000,
  verbose: true,
  onError: function(self, m) {
    console.log('FATAL: ' + m);
  },
  onStepTimeout: function (self, m){
    console.log('timeout: step' + m);
  },
  pageSettings: {
    loadImages: false,
    loadPlugins: false,
  }
});

var basicSelectorDictionary = {
  developmentPlanAreas: 'span[id^="Description_713925_734875"]',
  floodZones: 'span[id^="Description_713925_734356"]',
  heightLimit: 'span[id^="Description_713925_734869"]',
  lotRestriction: 'span[id^="Description_713925_775450"]',
  neighborhoodBoards: 'span[id^="Description_713925_775587"]',
  SMA: 'span[id^="Description_713925_734863"]',
  slideArea: 'span[id^="Description_713925_831366"]',
  stateLandUse: 'span[id^="Description_713925_734860"]',
  streetSetback: 'span[id^="Description_713925_775513"]',
  zoning: 'span[id^="Description_713925_734850"]',
};

var posseSelectorDictionary = {
  applicationNumber: 'span[id^="ExternalFileNum_713846_"]',
  jobNumber: 'span[id^="ExternalId_713846_"]',
  description: 'span[id^="Description_713846_"]',
  createdDate: 'span[id^="CreatedDate_713846_"]',
  issuedDate: 'span[id^="IssueDate_713846_"]',
  status: 'span[id^="StatusDescription_713846_"]',
  location: 'span[id^="JobLocation_713846_"]',
  jobCompletedDate: 'span[id^="CompletedDate_713846_"]',
  dateConstructionCompleted: 'span[id^="ConstructionCompletedDate_713846_"]',
  staffAssignment: 'span[id^="StaffAssignment_713848_"]',
  cityProject: 'span[id^="CityProject_713848_"]',
  jobAddress: 'span[id^="JobAddress_713848_"]',
  estimatedValue: 'span[id^="EstimatedValueofWork_713848_"]',
  acceptedValue: 'span[id^="AcceptedValue_713848_"]',
  occupancyGroupCategory: 'span[id^="OccupancyGroupCategory_713848_"]',
  occupancyGroup: 'span[id^="OccupancyGroupAssessed_713848_"]',
  ownership: 'span[id^="OwnershipAssessed_713848_"]',
  commercialOrResidential: 'span[id^="CommercialResidential_713848_"]',
  proposedUse: 'span[id^="ProposedUse_713848_"]',
  floorLevel: 'span[id^="FloorLevel_713848_"]',
  minTypesOfConstruction: 'span[id^="TypesofConstructionMin_713848_"]',
  actualTypesOfConstruction: 'span[id^="TypesofConstructionActual_713848_"]',
  numberStoriesExisting: 'span[id^="ExistingStories_713848_"]',
  numberFinalStories: 'span[id^="FinalStories_713848_"]',
  existingFloorArea: 'span[id^="ExistingFloorArea_713848_"]',
  newFloorArea: 'span[id^="NewFloorArea_713848_"]',
  totalFloorArea: 'span[id^="TotalFloorArea_713848_"]',
  buildingInspectionRequired: 'span[id^="BldgInspYesNo_713848_"]',
  electricalInspectionRequired: 'span[id^="ElecInspYesNo_713848_"]',
  plumbingInspectionRequired: 'span[id^="PlumbInspYesNo_713848_"]',
  plumbingPhases: 'span[id^="PlumbingPhases_713848_"]',
  electricalPhases: 'span[id^="ElectricalPhases_713848_"]',
  remarks: 'span[id^="Remarks_713848_"]',
  structureCode: 'span[id^="StructureCode_713848_"]',
  requireAffidavit: 'span[id^="RequireAffidavit_713848_"]',
  requireSpecialInspection: 'span[id^="RequireSpecialInspection_713848_"]',
  requireCalledInspection: 'span[id^="RequireCalledInspection_713848_"]',
  floodHazardDistrict: 'span[id^="FloodHazardTypes_713848_"]',
  numberUnitsAdded: 'span[id^="NumUnitsAdd_713848_"]',
  numberUnitsDeleted: 'span[id^="NumRoomsDel_713848_"]',
  numberRoomsAdded: 'span[id^="NumRoomsAdd_713848_"]',
  numberRoomsDeleted: 'span[id^="NumRoomsDel_713848_"]',
  locationPermitCreated: 'span[id^="LocationJobCreated_713848_"]',
  locationPermitIssued: 'span[id^="LocationPermitIssued_713848_"]',
    otherWork: 'span[id^="OtherWork_713849_"]',
    drivewayTypes: 'span[id^="DrivewayTypes_713850_"]',
    lenOfDriveway: 'span[id^="DrivewayLength_713850_"]',
    sidewalkTypes: 'span[id^="SidewalkTypes_713850_"]',
    lenOfSidewalk: 'span[id^="SidewalkLength_713850_"]',
    curbingTypes: 'span[id^="CurbingTypes_713850_"]',
    lenOfCurbing: 'span[id^="CurbingLength_713850_"]',
    numShowersToReplace: 'span[id^="ShowerCount_713850_"]',
    numFaucetsToReplace: 'span[id^="FaucetCount_713850_"]',
    numUrinalsToReplace: 'span[id^="UrinalNotobeReplaced_713850_"]',
    numToiletsToReplace: 'span[id^="ToiletCount_713850_"]',
    sewerConnectionPermitNo: 'span[id^="SewerConnPermitNo_713850_"]',
};

var posseButtons = {
    planReviewFee: 'input[id^="Commercial_713848_"]',
    certifOfOccupancyNeeded: 'input[id^="BldgShallNotBeOccUntilCOIssued_713848_"]',
    floodHazardComplied: 'input[id^="FloodHazardComplied_713848_"]',
    floodHazardExempt: 'input[id^="FloodHazardExempt_713848_"]',
    floodHazardElevation: 'input[id^="AsBuiltElevationCertification_713848_"]',
    workNewBuilding: 'input[id^="NewBuilding_713849_"]',
    workFoundationOnly: 'input[id^="FoundationOnly_713849_"]',
    workShellOnly: 'input[id^="ShellOnly_713849_"]',
    workAddition: 'input[id^="Addition_713849_"]',
    workAlteration: 'input[id^="Alteration_713849_"]',
    workRepair: 'input[id^="Repair_713849_"]',
    workDemolition: 'input[id^="Demolition_713849_"]',
    workFence: 'input[id^="Fence_713849_"]',
    workRetainingWall: 'input[id^="RetainingWall_713849_"]',
    workElectrical: 'input[id^="ElectricalWork_713849_"]',
    workElectricalMeter: 'input[id^="ElectricalMeterOnly_713849_"]',
    workFireAlarm: 'input[id^="FireAlarm_713849_"]',
    workPlumbing: 'input[id^="PlumbingWork_713849_"]',
    workFireSprinkler: 'input[id^="FireSprinkler_713849_"]',
    workAC: 'input[id^="AirConditioning_713849_"]',
    workOhana: 'input[id^="Ohana_713849_"]',
    workADU: 'input[id^="AccessoryDwellingUnitADU_713849_"]',
    workPool: 'input[id^="Pool_713849_"]',
    workEVCharger: 'input[id^="TOWElecVehCharger_713849_"]',
    workSolar: 'input[id^="Solar_713849_"]',
    workSolarPVInstall: 'input[id^="TOWSolarPhotovoltaic_713849_"]',
    workPVInstallWBattery: 'input[id^="TOWSolarPhotovoltaicWithBatter_713849_"]',
    workHeatPump: 'input[id^="HeatPump_713849_"]',
    workAntenna: 'input[id^="Antenna_713849_"]',
    workTemporary: 'input[id^="Temporary1_713849_"]',
    workRelocationTo: 'input[id^="RelocationTo_713849_"]',
    workRelocationFrom: 'input[id^="RelocationFrom_713849_"]',
    drivewayNew: 'input[id^="DrivewayNew1_713850_"]',
    drivewayExisting: 'input[id^="Existing_713850_"]',
    drivewayPrivate: 'input[id^="Private1_713850_"]',
    drivewayRepair: 'input[id^="TOWDrivewayRepair_713850_"]',
    sidewalkRepair: 'input[id^="TOWSidewalkRepair_713850_"]',
    occupancyCommercial: 'input[id^="OccupancyGroupCommercial_713850_"]',
    occupancyHotel: 'input[id^="OccupancyGroupHotel_713850_"]',
    occupancyIndustrial: 'input[id^="OccupancyGroupIndustrial_713850_"]',
    occupancyResidential: 'input[id^="OccupancyGroupResidential_713850_"]',
};

function camelize(str) {
    return str.trim().replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
        if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
            return index === 0 ? match.toLowerCase() : match.toUpperCase();
        });
}

function postPermit(appNumber, data) {
  casper.start();
  var postAddress = 'http://localhost:8000/permits/' + String(appNumber);

  casper.then( function() {
    casper.open(postAddress, {
      method: 'post',
      data: data // this data is json of a permit
    });
  });

  casper.run();
}

function postTmk(tmk, result) {
  casper.start();

  var postAddress = 'http://localhost:8000/tmks/' + String(tmk);

  casper.then( function() {
    casper.open(postAddress, {
      method: 'post',
      data: {'body': String(result)} // this data is json of a permit
    });
  });

  casper.run();
}

function parse() {

  casper.start();

  var allTmks = [];

  casper.then( function () {
    casper.open('http://localhost:8000/shorttmks/?num=2', {
      method: 'get',
      enctype: 'application/json'
    });
  });

  casper.then( function () {
    allTmks = JSON.parse(casper.getPageContent()).data;
  });

  casper.then( function () {

    casper.echo(allTmks.length);

    casper.each(allTmks, function (self, link) {

      var posseId = 0;

      var tmk = String(link.TMK);

      console.log(tmk);

      var form = {};

      var result = false;

      self.thenOpen('http://dppweb.honolulu.gov/DPPWeb/Default.aspx?PossePresentation=PropertySearch');

      self.waitForSelector('span#TMK_713880_S0_sp', function () {
        this.echo('tmk is ' + tmk);
        this.fillSelectors('span#TMK_713880_S0_sp', {
          'input[name="TMK_713880_S0"]': tmk,
        }, false);
      }, function () {
        console.log('DPP search page timeout' + tmk);
      }, 10000);

      self.then(function () {
        this.click('a#ctl00_cphBottomFunctionBand_ctl05_PerformSearch');
      });

      self.then(function () {
        var addr = this.getCurrentUrl();
        posseId = addr.slice(addr.lastIndexOf('=') + 1);
        form['posseId'] = posseId;
      });

// Parsing basic info
      self.then(function () {
        for (var key in basicSelectorDictionary) {
          form[key] = this.fetchText(basicSelectorDictionary[key]);
        }
      });

// Getting to the permits page
      self.then(function () {
        if (this.exists('a#ctl00_cphTopBand_ctl03_hlkTabLink')) {
          this.click('a#ctl00_cphTopBand_ctl03_hlkTabLink');
        }
      });

      self.then(function () {

        var links = this.getElementsAttribute('a[href*="BuildingPermit&PosseObjectId"]', 'href');

        this.each(links, function (self, link) {
          console.log('link in process: ', link);
          self.thenOpen('http:' + link, function() {
            // TODO check if link is already present in the database

            var permit = form;

            permit['link'] = link;
            // Parsing the permit
            for (var key in posseSelectorDictionary) {
              permit[key] = this.fetchText(posseSelectorDictionary[key]);
            }
            for (var key in posseButtons) {
              permit[key] = this.getElementAttribute(posseButtons[key], 'value');
            }
            console.log('Collected permit: ', permit.applicationNumber);

            var postAddress = 'http://localhost:8000/permits/' + String(permit.applicationNumber);

            this.then( function() {
              this.thenOpen(postAddress, {
                method: 'post',
                data: permit // this data is json of a permit
              });
            });
            //postPermit(permit.applicationNumber, permit);
          });
        });
      });

      result = true;

      var postAddress = 'http://localhost:8000/shorttmks/' + String(tmk);

      self.then( function() {
        this.thenOpen(postAddress, {
          method: 'post',
          data: {'body': String(result)} // this data is a result of the process
        });
      });
    });
  });

  // var casper = require('casper').create();


  casper.run();
}

function parseBunch(num) {
  var reqLink = 'http://localhost:8000/tmks/?num=' + String(num);

  casper.start();

  casper.then( function () {
    casper.open(reqLink, {
      method: 'get',
      enctype: 'application/json'
    }).then( function () {
      tmks = JSON.parse(casper.getPageContent());
      parse(tmks.data);
    });
  });

  casper.run();
}

parse();

// Search by TMK from the main page
