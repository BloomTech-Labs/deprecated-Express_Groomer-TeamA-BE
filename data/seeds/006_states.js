exports.seed = async (knex) => {
  await knex('states').insert([
    // Insert states
    {
      id: '1',
      name: 'Andaman and Nicobar Islands',
      country_id: '101',
    },
    {
      id: '2',
      name: 'Andhra Pradesh',
      country_id: '101',
    },
    {
      id: '3',
      name: 'Arunachal Pradesh',
      country_id: '101',
    },
    {
      id: '4',
      name: 'Assam',
      country_id: '101',
    },
    {
      id: '5',
      name: 'Bihar',
      country_id: '101',
    },
    {
      id: '6',
      name: 'Chandigarh',
      country_id: '101',
    },
    {
      id: '7',
      name: 'Chhattisgarh',
      country_id: '101',
    },
    {
      id: '8',
      name: 'Dadra and Nagar Haveli',
      country_id: '101',
    },
    {
      id: '9',
      name: 'Daman and Diu',
      country_id: '101',
    },
    {
      id: '10',
      name: 'Delhi',
      country_id: '101',
    },
    {
      id: '11',
      name: 'Goa',
      country_id: '101',
    },
    {
      id: '12',
      name: 'Gujarat',
      country_id: '101',
    },
    {
      id: '13',
      name: 'Haryana',
      country_id: '101',
    },
    {
      id: '14',
      name: 'Himachal Pradesh',
      country_id: '101',
    },
    {
      id: '15',
      name: 'Jammu and Kashmir',
      country_id: '101',
    },
    {
      id: '16',
      name: 'Jharkhand',
      country_id: '101',
    },
    {
      id: '17',
      name: 'Karnataka',
      country_id: '101',
    },
    {
      id: '19',
      name: 'Kerala',
      country_id: '101',
    },
    {
      id: '20',
      name: 'Lakshadweep',
      country_id: '101',
    },
    {
      id: '21',
      name: 'Madhya Pradesh',
      country_id: '101',
    },
    {
      id: '22',
      name: 'Maharashtra',
      country_id: '101',
    },
    {
      id: '23',
      name: 'Manipur',
      country_id: '101',
    },
    {
      id: '24',
      name: 'Meghalaya',
      country_id: '101',
    },
    {
      id: '25',
      name: 'Mizoram',
      country_id: '101',
    },
    {
      id: '26',
      name: 'Nagaland',
      country_id: '101',
    },
    {
      id: '29',
      name: 'Odisha',
      country_id: '101',
    },
    {
      id: '31',
      name: 'Pondicherry',
      country_id: '101',
    },
    {
      id: '32',
      name: 'Punjab',
      country_id: '101',
    },
    {
      id: '33',
      name: 'Rajasthan',
      country_id: '101',
    },
    {
      id: '34',
      name: 'Sikkim',
      country_id: '101',
    },
    {
      id: '35',
      name: 'Tamil Nadu',
      country_id: '101',
    },
    {
      id: '36',
      name: 'Telangana',
      country_id: '101',
    },
    {
      id: '37',
      name: 'Tripura',
      country_id: '101',
    },
    {
      id: '38',
      name: 'Uttar Pradesh',
      country_id: '101',
    },
    {
      id: '39',
      name: 'Uttarakhand',
      country_id: '101',
    },
    {
      id: '41',
      name: 'West Bengal',
      country_id: '101',
    },
    {
      id: '42',
      name: 'Badakhshan',
      country_id: '1',
    },
    {
      id: '43',
      name: 'Badgis',
      country_id: '1',
    },
    {
      id: '44',
      name: 'Baglan',
      country_id: '1',
    },
    {
      id: '45',
      name: 'Balkh',
      country_id: '1',
    },
    {
      id: '46',
      name: 'Bamiyan',
      country_id: '1',
    },
    {
      id: '47',
      name: 'Farah',
      country_id: '1',
    },
    {
      id: '48',
      name: 'Faryab',
      country_id: '1',
    },
    {
      id: '49',
      name: 'Gawr',
      country_id: '1',
    },
    {
      id: '50',
      name: 'Gazni',
      country_id: '1',
    },
    {
      id: '51',
      name: 'Herat',
      country_id: '1',
    },
    {
      id: '52',
      name: 'Hilmand',
      country_id: '1',
    },
    {
      id: '53',
      name: 'Jawzjan',
      country_id: '1',
    },
    {
      id: '54',
      name: 'Kabul',
      country_id: '1',
    },
    {
      id: '55',
      name: 'Kapisa',
      country_id: '1',
    },
    {
      id: '56',
      name: 'Khawst',
      country_id: '1',
    },
    {
      id: '57',
      name: 'Kunar',
      country_id: '1',
    },
    {
      id: '58',
      name: 'Lagman',
      country_id: '1',
    },
    {
      id: '59',
      name: 'Lawghar',
      country_id: '1',
    },
    {
      id: '60',
      name: 'Nangarhar',
      country_id: '1',
    },
    {
      id: '61',
      name: 'Nimruz',
      country_id: '1',
    },
    {
      id: '62',
      name: 'Nuristan',
      country_id: '1',
    },
    {
      id: '63',
      name: 'Paktika',
      country_id: '1',
    },
    {
      id: '64',
      name: 'Paktiya',
      country_id: '1',
    },
    {
      id: '65',
      name: 'Parwan',
      country_id: '1',
    },
    {
      id: '66',
      name: 'Qandahar',
      country_id: '1',
    },
    {
      id: '67',
      name: 'Qunduz',
      country_id: '1',
    },
    {
      id: '68',
      name: 'Samangan',
      country_id: '1',
    },
    {
      id: '69',
      name: 'Sar-e Pul',
      country_id: '1',
    },
    {
      id: '70',
      name: 'Takhar',
      country_id: '1',
    },
    {
      id: '71',
      name: 'Uruzgan',
      country_id: '1',
    },
    {
      id: '72',
      name: 'Wardag',
      country_id: '1',
    },
    {
      id: '73',
      name: 'Zabul',
      country_id: '1',
    },
    {
      id: '74',
      name: 'Berat',
      country_id: '2',
    },
    {
      id: '75',
      name: 'Bulqize',
      country_id: '2',
    },
    {
      id: '76',
      name: 'Delvine',
      country_id: '2',
    },
    {
      id: '77',
      name: 'Devoll',
      country_id: '2',
    },
    {
      id: '78',
      name: 'Dibre',
      country_id: '2',
    },
    {
      id: '79',
      name: 'Durres',
      country_id: '2',
    },
    {
      id: '80',
      name: 'Elbasan',
      country_id: '2',
    },
    {
      id: '81',
      name: 'Fier',
      country_id: '2',
    },
    {
      id: '82',
      name: 'Gjirokaster',
      country_id: '2',
    },
    {
      id: '83',
      name: 'Gramsh',
      country_id: '2',
    },
    {
      id: '84',
      name: 'Has',
      country_id: '2',
    },
    {
      id: '85',
      name: 'Kavaje',
      country_id: '2',
    },
    {
      id: '86',
      name: 'Kolonje',
      country_id: '2',
    },
    {
      id: '87',
      name: 'Korce',
      country_id: '2',
    },
    {
      id: '88',
      name: 'Kruje',
      country_id: '2',
    },
    {
      id: '89',
      name: 'Kucove',
      country_id: '2',
    },
    {
      id: '90',
      name: 'Kukes',
      country_id: '2',
    },
    {
      id: '91',
      name: 'Kurbin',
      country_id: '2',
    },
    {
      id: '92',
      name: 'Lezhe',
      country_id: '2',
    },
    {
      id: '93',
      name: 'Librazhd',
      country_id: '2',
    },
    {
      id: '94',
      name: 'Lushnje',
      country_id: '2',
    },
    {
      id: '95',
      name: 'Mallakaster',
      country_id: '2',
    },
    {
      id: '96',
      name: 'Malsi e Madhe',
      country_id: '2',
    },
    {
      id: '97',
      name: 'Mat',
      country_id: '2',
    },
    {
      id: '98',
      name: 'Mirdite',
      country_id: '2',
    },
    {
      id: '99',
      name: 'Peqin',
      country_id: '2',
    },
    {
      id: '100',
      name: 'Permet',
      country_id: '2',
    },
    {
      id: '101',
      name: 'Pogradec',
      country_id: '2',
    },
    {
      id: '102',
      name: 'Puke',
      country_id: '2',
    },
    {
      id: '103',
      name: 'Sarande',
      country_id: '2',
    },
    {
      id: '104',
      name: 'Shkoder',
      country_id: '2',
    },
    {
      id: '105',
      name: 'Skrapar',
      country_id: '2',
    },
    {
      id: '106',
      name: 'Tepelene',
      country_id: '2',
    },
    {
      id: '107',
      name: 'Tirane',
      country_id: '2',
    },
    {
      id: '108',
      name: 'Tropoje',
      country_id: '2',
    },
    {
      id: '109',
      name: 'Vlore',
      country_id: '2',
    },
    {
      id: '110',
      name: 'Ayn Daflah',
      country_id: '3',
    },
    {
      id: '111',
      name: 'Ayn Tamushanat',
      country_id: '3',
    },
    {
      id: '112',
      name: 'Adrar',
      country_id: '3',
    },
    {
      id: '113',
      name: 'Algiers',
      country_id: '3',
    },
    {
      id: '114',
      name: 'Annabah',
      country_id: '3',
    },
    {
      id: '115',
      name: 'Bashshar',
      country_id: '3',
    },
    {
      id: '116',
      name: 'Batnah',
      country_id: '3',
    },
    {
      id: '117',
      name: 'Bijayah',
      country_id: '3',
    },
    {
      id: '118',
      name: 'Biskrah',
      country_id: '3',
    },
    {
      id: '119',
      name: 'Blidah',
      country_id: '3',
    },
    {
      id: '120',
      name: 'Buirah',
      country_id: '3',
    },
    {
      id: '121',
      name: 'Bumardas',
      country_id: '3',
    },
    {
      id: '122',
      name: 'Burj Bu Arririj',
      country_id: '3',
    },
    {
      id: '123',
      name: 'Ghalizan',
      country_id: '3',
    },
    {
      id: '124',
      name: 'Ghardayah',
      country_id: '3',
    },
    {
      id: '125',
      name: 'Ilizi',
      country_id: '3',
    },
    {
      id: '126',
      name: 'Jijili',
      country_id: '3',
    },
    {
      id: '127',
      name: 'Jilfah',
      country_id: '3',
    },
    {
      id: '128',
      name: 'Khanshalah',
      country_id: '3',
    },
    {
      id: '129',
      name: 'Masilah',
      country_id: '3',
    },
    {
      id: '130',
      name: 'Midyah',
      country_id: '3',
    },
    {
      id: '131',
      name: 'Milah',
      country_id: '3',
    },
    {
      id: '132',
      name: 'Muaskar',
      country_id: '3',
    },
    {
      id: '133',
      name: 'Mustaghanam',
      country_id: '3',
    },
    {
      id: '134',
      name: 'Naama',
      country_id: '3',
    },
    {
      id: '135',
      name: 'Oran',
      country_id: '3',
    },
    {
      id: '136',
      name: 'Ouargla',
      country_id: '3',
    },
    {
      id: '137',
      name: 'Qalmah',
      country_id: '3',
    },
    {
      id: '138',
      name: 'Qustantinah',
      country_id: '3',
    },
    {
      id: '139',
      name: 'Sakikdah',
      country_id: '3',
    },
    {
      id: '140',
      name: 'Satif',
      country_id: '3',
    },
    {
      id: '141',
      name: 'Sayda',
      country_id: '3',
    },
    {
      id: '142',
      name: "Sidi ban-al-''Abbas",
      country_id: '3',
    },
    {
      id: '143',
      name: 'Suq Ahras',
      country_id: '3',
    },
    {
      id: '144',
      name: 'Tamanghasat',
      country_id: '3',
    },
    {
      id: '145',
      name: 'Tibazah',
      country_id: '3',
    },
    {
      id: '146',
      name: 'Tibissah',
      country_id: '3',
    },
    {
      id: '147',
      name: 'Tilimsan',
      country_id: '3',
    },
    {
      id: '148',
      name: 'Tinduf',
      country_id: '3',
    },
    {
      id: '149',
      name: 'Tisamsilt',
      country_id: '3',
    },
    {
      id: '150',
      name: 'Tiyarat',
      country_id: '3',
    },
    {
      id: '151',
      name: 'Tizi Wazu',
      country_id: '3',
    },
    {
      id: '152',
      name: 'Umm-al-Bawaghi',
      country_id: '3',
    },
    {
      id: '153',
      name: 'Wahran',
      country_id: '3',
    },
    {
      id: '154',
      name: 'Warqla',
      country_id: '3',
    },
    {
      id: '155',
      name: 'Wilaya d Alger',
      country_id: '3',
    },
    {
      id: '156',
      name: 'Wilaya de Bejaia',
      country_id: '3',
    },
    {
      id: '157',
      name: 'Wilaya de Constantine',
      country_id: '3',
    },
    {
      id: '158',
      name: 'al-Aghwat',
      country_id: '3',
    },
    {
      id: '159',
      name: 'al-Bayadh',
      country_id: '3',
    },
    {
      id: '160',
      name: "al-Jaza''ir",
      country_id: '3',
    },
    {
      id: '161',
      name: 'al-Wad',
      country_id: '3',
    },
    {
      id: '162',
      name: 'ash-Shalif',
      country_id: '3',
    },
    {
      id: '163',
      name: 'at-Tarif',
      country_id: '3',
    },
    {
      id: '164',
      name: 'Eastern',
      country_id: '4',
    },
    {
      id: '165',
      name: "Manu''a",
      country_id: '4',
    },
    {
      id: '166',
      name: 'Swains Island',
      country_id: '4',
    },
    {
      id: '167',
      name: 'Western',
      country_id: '4',
    },
    {
      id: '168',
      name: 'Andorra la Vella',
      country_id: '5',
    },
    {
      id: '169',
      name: 'Canillo',
      country_id: '5',
    },
    {
      id: '170',
      name: 'Encamp',
      country_id: '5',
    },
    {
      id: '171',
      name: 'La Massana',
      country_id: '5',
    },
    {
      id: '172',
      name: 'Les Escaldes',
      country_id: '5',
    },
    {
      id: '173',
      name: 'Ordino',
      country_id: '5',
    },
    {
      id: '174',
      name: 'Sant Julia de Loria',
      country_id: '5',
    },
    {
      id: '175',
      name: 'Bengo',
      country_id: '6',
    },
    {
      id: '176',
      name: 'Benguela',
      country_id: '6',
    },
    {
      id: '177',
      name: 'Bie',
      country_id: '6',
    },
    {
      id: '178',
      name: 'Cabinda',
      country_id: '6',
    },
    {
      id: '179',
      name: 'Cunene',
      country_id: '6',
    },
    {
      id: '180',
      name: 'Huambo',
      country_id: '6',
    },
    {
      id: '181',
      name: 'Huila',
      country_id: '6',
    },
    {
      id: '182',
      name: 'Kuando-Kubango',
      country_id: '6',
    },
    {
      id: '183',
      name: 'Kwanza Norte',
      country_id: '6',
    },
    {
      id: '184',
      name: 'Kwanza Sul',
      country_id: '6',
    },
    {
      id: '185',
      name: 'Luanda',
      country_id: '6',
    },
    {
      id: '186',
      name: 'Lunda Norte',
      country_id: '6',
    },
    {
      id: '187',
      name: 'Lunda Sul',
      country_id: '6',
    },
    {
      id: '188',
      name: 'Malanje',
      country_id: '6',
    },
    {
      id: '189',
      name: 'Moxico',
      country_id: '6',
    },
    {
      id: '190',
      name: 'Namibe',
      country_id: '6',
    },
    {
      id: '191',
      name: 'Uige',
      country_id: '6',
    },
    {
      id: '192',
      name: 'Zaire',
      country_id: '6',
    },
    {
      id: '193',
      name: 'Other Provinces',
      country_id: '7',
    },
    {
      id: '194',
      name: 'Sector claimed by Argentina/Ch',
      country_id: '8',
    },
    {
      id: '195',
      name: 'Sector claimed by Argentina/UK',
      country_id: '8',
    },
    {
      id: '196',
      name: 'Sector claimed by Australia',
      country_id: '8',
    },
    {
      id: '197',
      name: 'Sector claimed by France',
      country_id: '8',
    },
    {
      id: '198',
      name: 'Sector claimed by New Zealand',
      country_id: '8',
    },
    {
      id: '199',
      name: 'Sector claimed by Norway',
      country_id: '8',
    },
    {
      id: '200',
      name: 'Unclaimed Sector',
      country_id: '8',
    },
    {
      id: '201',
      name: 'Barbuda',
      country_id: '9',
    },
    {
      id: '202',
      name: 'Saint George',
      country_id: '9',
    },
    {
      id: '203',
      name: 'Saint John',
      country_id: '9',
    },
    {
      id: '204',
      name: 'Saint Mary',
      country_id: '9',
    },
    {
      id: '205',
      name: 'Saint Paul',
      country_id: '9',
    },
    {
      id: '3919',
      name: 'Alabama',
      country_id: '231',
    },
    {
      id: '3920',
      name: 'Alaska',
      country_id: '231',
    },
    {
      id: '3921',
      name: 'Arizona',
      country_id: '231',
    },
    {
      id: '3922',
      name: 'Arkansas',
      country_id: '231',
    },
    {
      id: '3923',
      name: 'Byram',
      country_id: '231',
    },
    {
      id: '3924',
      name: 'California',
      country_id: '231',
    },
    {
      id: '3925',
      name: 'Cokato',
      country_id: '231',
    },
    {
      id: '3926',
      name: 'Colorado',
      country_id: '231',
    },
    {
      id: '3927',
      name: 'Connecticut',
      country_id: '231',
    },
    {
      id: '3928',
      name: 'Delaware',
      country_id: '231',
    },
    {
      id: '3929',
      name: 'District of Columbia',
      country_id: '231',
    },
    {
      id: '3930',
      name: 'Florida',
      country_id: '231',
    },
    {
      id: '3931',
      name: 'Georgia',
      country_id: '231',
    },
    {
      id: '3932',
      name: 'Hawaii',
      country_id: '231',
    },
    {
      id: '3933',
      name: 'Idaho',
      country_id: '231',
    },
    {
      id: '3934',
      name: 'Illinois',
      country_id: '231',
    },
    {
      id: '3935',
      name: 'Indiana',
      country_id: '231',
    },
    {
      id: '3936',
      name: 'Iowa',
      country_id: '231',
    },
    {
      id: '3937',
      name: 'Kansas',
      country_id: '231',
    },
    {
      id: '3938',
      name: 'Kentucky',
      country_id: '231',
    },
    {
      id: '3939',
      name: 'Louisiana',
      country_id: '231',
    },
    {
      id: '3940',
      name: 'Lowa',
      country_id: '231',
    },
    {
      id: '3941',
      name: 'Maine',
      country_id: '231',
    },
    {
      id: '3942',
      name: 'Maryland',
      country_id: '231',
    },
    {
      id: '3943',
      name: 'Massachusetts',
      country_id: '231',
    },
    {
      id: '3944',
      name: 'Medfield',
      country_id: '231',
    },
    {
      id: '3945',
      name: 'Michigan',
      country_id: '231',
    },
    {
      id: '3946',
      name: 'Minnesota',
      country_id: '231',
    },
    {
      id: '3947',
      name: 'Mississippi',
      country_id: '231',
    },
    {
      id: '3948',
      name: 'Missouri',
      country_id: '231',
    },
    {
      id: '3949',
      name: 'Montana',
      country_id: '231',
    },
    {
      id: '3950',
      name: 'Nebraska',
      country_id: '231',
    },
    {
      id: '3951',
      name: 'Nevada',
      country_id: '231',
    },
    {
      id: '3952',
      name: 'New Hampshire',
      country_id: '231',
    },
    {
      id: '3953',
      name: 'New Jersey',
      country_id: '231',
    },
    {
      id: '3955',
      name: 'New Mexico',
      country_id: '231',
    },
    {
      id: '3956',
      name: 'New York',
      country_id: '231',
    },
    {
      id: '3957',
      name: 'North Carolina',
      country_id: '231',
    },
    {
      id: '3958',
      name: 'North Dakota',
      country_id: '231',
    },
    {
      id: '3959',
      name: 'Ohio',
      country_id: '231',
    },
    {
      id: '3960',
      name: 'Oklahoma',
      country_id: '231',
    },
    {
      id: '3961',
      name: 'Ontario',
      country_id: '231',
    },
    {
      id: '3962',
      name: 'Oregon',
      country_id: '231',
    },
    {
      id: '3963',
      name: 'Pennsylvania',
      country_id: '231',
    },
    {
      id: '3964',
      name: 'Ramey',
      country_id: '231',
    },
    {
      id: '3965',
      name: 'Rhode Island',
      country_id: '231',
    },
    {
      id: '3966',
      name: 'South Carolina',
      country_id: '231',
    },
    {
      id: '3967',
      name: 'South Dakota',
      country_id: '231',
    },
    {
      id: '3968',
      name: 'Sublimity',
      country_id: '231',
    },
    {
      id: '3969',
      name: 'Tennessee',
      country_id: '231',
    },
    {
      id: '3970',
      name: 'Texas',
      country_id: '231',
    },
    {
      id: '3971',
      name: 'Trimble',
      country_id: '231',
    },
    {
      id: '3972',
      name: 'Utah',
      country_id: '231',
    },
    {
      id: '3973',
      name: 'Vermont',
      country_id: '231',
    },
    {
      id: '3974',
      name: 'Virginia',
      country_id: '231',
    },
    {
      id: '3975',
      name: 'Washington',
      country_id: '231',
    },
    {
      id: '3976',
      name: 'West Virginia',
      country_id: '231',
    },
    {
      id: '3977',
      name: 'Wisconsin',
      country_id: '231',
    },
    {
      id: '3978',
      name: 'Wyoming',
      country_id: '231',
    },
  ]);
};
