exports.seed = async (knex) => {
  await knex("countries").insert([
    // Insert countries
        {
          "id": 1,
          "sort_name": "AF",
          "name": "Afghanistan",
          "phone_code": 93
        },
        {
          "id": 2,
          "sort_name": "AL",
          "name": "Albania",
          "phone_code": 355
        },
        {
          "id": 3,
          "sort_name": "DZ",
          "name": "Algeria",
          "phone_code": 213
        },
        {
          "id": 4,
          "sort_name": "AS",
          "name": "American Samoa",
          "phone_code": 1684
        },
        {
          "id": 5,
          "sort_name": "AD",
          "name": "Andorra",
          "phone_code": 376
        },
        {
          "id": 6,
          "sort_name": "AO",
          "name": "Angola",
          "phone_code": 244
        },
        {
          "id": 7,
          "sort_name": "AI",
          "name": "Anguilla",
          "phone_code": 1264
        },
        {
          "id": 8,
          "sort_name": "AQ",
          "name": "Antarctica",
          "phone_code": 0
        },
        {
          "id": 9,
          "sort_name": "AG",
          "name": "Antigua And Barbuda",
          "phone_code": 1268
        },
        {
          "id": 10,
          "sort_name": "AR",
          "name": "Argentina",
          "phone_code": 54
        },
        {
          "id": 11,
          "sort_name": "AM",
          "name": "Armenia",
          "phone_code": 374
        },
        {
          "id": 12,
          "sort_name": "AW",
          "name": "Aruba",
          "phone_code": 297
        },
        {
          "id": 13,
          "sort_name": "AU",
          "name": "Australia",
          "phone_code": 61
        },
        {
          "id": 14,
          "sort_name": "AT",
          "name": "Austria",
          "phone_code": 43
        },
        {
          "id": 15,
          "sort_name": "AZ",
          "name": "Azerbaijan",
          "phone_code": 994
        },
        {
          "id": 16,
          "sort_name": "BS",
          "name": "Bahamas The",
          "phone_code": 1242
        },
        {
          "id": 17,
          "sort_name": "BH",
          "name": "Bahrain",
          "phone_code": 973
        },
        {
          "id": 18,
          "sort_name": "BD",
          "name": "Bangladesh",
          "phone_code": 880
        },
        {
          "id": 19,
          "sort_name": "BB",
          "name": "Barbados",
          "phone_code": 1246
        },
        {
          "id": 20,
          "sort_name": "BY",
          "name": "Belarus",
          "phone_code": 375
        },
        {
          "id": 21,
          "sort_name": "BE",
          "name": "Belgium",
          "phone_code": 32
        },
        {
          "id": 22,
          "sort_name": "BZ",
          "name": "Belize",
          "phone_code": 501
        },
        {
          "id": 23,
          "sort_name": "BJ",
          "name": "Benin",
          "phone_code": 229
        },
        {
          "id": 24,
          "sort_name": "BM",
          "name": "Bermuda",
          "phone_code": 1441
        },
        {
          "id": 25,
          "sort_name": "BT",
          "name": "Bhutan",
          "phone_code": 975
        },
        {
          "id": 26,
          "sort_name": "BO",
          "name": "Bolivia",
          "phone_code": 591
        },
        {
          "id": 27,
          "sort_name": "BA",
          "name": "Bosnia and Herzegovina",
          "phone_code": 387
        },
        {
          "id": 28,
          "sort_name": "BW",
          "name": "Botswana",
          "phone_code": 267
        },
        {
          "id": 29,
          "sort_name": "BV",
          "name": "Bouvet Island",
          "phone_code": 0
        },
        {
          "id": 30,
          "sort_name": "BR",
          "name": "Brazil",
          "phone_code": 55
        },
        {
          "id": 31,
          "sort_name": "IO",
          "name": "British Indian Ocean Territory",
          "phone_code": 246
        },
        {
          "id": 32,
          "sort_name": "BN",
          "name": "Brunei",
          "phone_code": 673
        },
        {
          "id": 33,
          "sort_name": "BG",
          "name": "Bulgaria",
          "phone_code": 359
        },
        {
          "id": 34,
          "sort_name": "BF",
          "name": "Burkina Faso",
          "phone_code": 226
        },
        {
          "id": 35,
          "sort_name": "BI",
          "name": "Burundi",
          "phone_code": 257
        },
        {
          "id": 36,
          "sort_name": "KH",
          "name": "Cambodia",
          "phone_code": 855
        },
        {
          "id": 37,
          "sort_name": "CM",
          "name": "Cameroon",
          "phone_code": 237
        },
        {
          "id": 38,
          "sort_name": "CA",
          "name": "Canada",
          "phone_code": 1
        },
        {
          "id": 39,
          "sort_name": "CV",
          "name": "Cape Verde",
          "phone_code": 238
        },
        {
          "id": 40,
          "sort_name": "KY",
          "name": "Cayman Islands",
          "phone_code": 1345
        },
        {
          "id": 41,
          "sort_name": "CF",
          "name": "Central African Republic",
          "phone_code": 236
        },
        {
          "id": 42,
          "sort_name": "TD",
          "name": "Chad",
          "phone_code": 235
        },
        {
          "id": 43,
          "sort_name": "CL",
          "name": "Chile",
          "phone_code": 56
        },
        {
          "id": 44,
          "sort_name": "CN",
          "name": "China",
          "phone_code": 86
        },
        {
          "id": 45,
          "sort_name": "CX",
          "name": "Christmas Island",
          "phone_code": 61
        },
        {
          "id": 46,
          "sort_name": "CC",
          "name": "Cocos (Keeling) Islands",
          "phone_code": 672
        },
        {
          "id": 47,
          "sort_name": "CO",
          "name": "Colombia",
          "phone_code": 57
        },
        {
          "id": 48,
          "sort_name": "KM",
          "name": "Comoros",
          "phone_code": 269
        },
        {
          "id": 49,
          "sort_name": "CG",
          "name": "Republic Of The Congo",
          "phone_code": 242
        },
        {
          "id": 50,
          "sort_name": "CD",
          "name": "Democratic Republic Of The Congo",
          "phone_code": 242
        },
        {
          "id": 51,
          "sort_name": "CK",
          "name": "Cook Islands",
          "phone_code": 682
        },
        {
          "id": 52,
          "sort_name": "CR",
          "name": "Costa Rica",
          "phone_code": 506
        },
        {
          "id": 53,
          "sort_name": "CI",
          "name": "Cote D''Ivoire (Ivory Coast)",
          "phone_code": 225
        },
        {
          "id": 54,
          "sort_name": "HR",
          "name": "Croatia (Hrvatska)",
          "phone_code": 385
        },
        {
          "id": 55,
          "sort_name": "CU",
          "name": "Cuba",
          "phone_code": 53
        },
        {
          "id": 56,
          "sort_name": "CY",
          "name": "Cyprus",
          "phone_code": 357
        },
        {
          "id": 57,
          "sort_name": "CZ",
          "name": "Czech Republic",
          "phone_code": 420
        },
        {
          "id": 58,
          "sort_name": "DK",
          "name": "Denmark",
          "phone_code": 45
        },
        {
          "id": 59,
          "sort_name": "DJ",
          "name": "Djibouti",
          "phone_code": 253
        },
        {
          "id": 60,
          "sort_name": "DM",
          "name": "Dominica",
          "phone_code": 1767
        },
        {
          "id": 61,
          "sort_name": "DO",
          "name": "Dominican Republic",
          "phone_code": 1809
        },
        {
          "id": 62,
          "sort_name": "TP",
          "name": "East Timor",
          "phone_code": 670
        },
        {
          "id": 63,
          "sort_name": "EC",
          "name": "Ecuador",
          "phone_code": 593
        },
        {
          "id": 64,
          "sort_name": "EG",
          "name": "Egypt",
          "phone_code": 20
        },
        {
          "id": 65,
          "sort_name": "SV",
          "name": "El Salvador",
          "phone_code": 503
        },
        {
          "id": 66,
          "sort_name": "GQ",
          "name": "Equatorial Guinea",
          "phone_code": 240
        },
        {
          "id": 67,
          "sort_name": "ER",
          "name": "Eritrea",
          "phone_code": 291
        },
        {
          "id": 68,
          "sort_name": "EE",
          "name": "Estonia",
          "phone_code": 372
        },
        {
          "id": 69,
          "sort_name": "ET",
          "name": "Ethiopia",
          "phone_code": 251
        },
        {
          "id": 70,
          "sort_name": "XA",
          "name": "External Territories of Australia",
          "phone_code": 61
        },
        {
          "id": 71,
          "sort_name": "FK",
          "name": "Falkland Islands",
          "phone_code": 500
        },
        {
          "id": 72,
          "sort_name": "FO",
          "name": "Faroe Islands",
          "phone_code": 298
        },
        {
          "id": 73,
          "sort_name": "FJ",
          "name": "Fiji Islands",
          "phone_code": 679
        },
        {
          "id": 74,
          "sort_name": "FI",
          "name": "Finland",
          "phone_code": 358
        },
        {
          "id": 75,
          "sort_name": "FR",
          "name": "France",
          "phone_code": 33
        },
        {
          "id": 76,
          "sort_name": "GF",
          "name": "French Guiana",
          "phone_code": 594
        },
        {
          "id": 77,
          "sort_name": "PF",
          "name": "French Polynesia",
          "phone_code": 689
        },
        {
          "id": 78,
          "sort_name": "TF",
          "name": "French Southern Territories",
          "phone_code": 0
        },
        {
          "id": 79,
          "sort_name": "GA",
          "name": "Gabon",
          "phone_code": 241
        },
        {
          "id": 80,
          "sort_name": "GM",
          "name": "Gambia The",
          "phone_code": 220
        },
        {
          "id": 81,
          "sort_name": "GE",
          "name": "Georgia",
          "phone_code": 995
        },
        {
          "id": 82,
          "sort_name": "DE",
          "name": "Germany",
          "phone_code": 49
        },
        {
          "id": 83,
          "sort_name": "GH",
          "name": "Ghana",
          "phone_code": 233
        },
        {
          "id": 84,
          "sort_name": "GI",
          "name": "Gibraltar",
          "phone_code": 350
        },
        {
          "id": 85,
          "sort_name": "GR",
          "name": "Greece",
          "phone_code": 30
        },
        {
          "id": 86,
          "sort_name": "GL",
          "name": "Greenland",
          "phone_code": 299
        },
        {
          "id": 87,
          "sort_name": "GD",
          "name": "Grenada",
          "phone_code": 1473
        },
        {
          "id": 88,
          "sort_name": "GP",
          "name": "Guadeloupe",
          "phone_code": 590
        },
        {
          "id": 89,
          "sort_name": "GU",
          "name": "Guam",
          "phone_code": 1671
        },
        {
          "id": 90,
          "sort_name": "GT",
          "name": "Guatemala",
          "phone_code": 502
        },
        {
          "id": 91,
          "sort_name": "XU",
          "name": "Guernsey and Alderney",
          "phone_code": 44
        },
        {
          "id": 92,
          "sort_name": "GN",
          "name": "Guinea",
          "phone_code": 224
        },
        {
          "id": 93,
          "sort_name": "GW",
          "name": "Guinea-Bissau",
          "phone_code": 245
        },
        {
          "id": 94,
          "sort_name": "GY",
          "name": "Guyana",
          "phone_code": 592
        },
        {
          "id": 95,
          "sort_name": "HT",
          "name": "Haiti",
          "phone_code": 509
        },
        {
          "id": 96,
          "sort_name": "HM",
          "name": "Heard and McDonald Islands",
          "phone_code": 0
        },
        {
          "id": 97,
          "sort_name": "HN",
          "name": "Honduras",
          "phone_code": 504
        },
        {
          "id": 98,
          "sort_name": "HK",
          "name": "Hong Kong S.A.R.",
          "phone_code": 852
        },
        {
          "id": 99,
          "sort_name": "HU",
          "name": "Hungary",
          "phone_code": 36
        },
        {
          "id": 100,
          "sort_name": "IS",
          "name": "Iceland",
          "phone_code": 354
        },
        {
          "id": 101,
          "sort_name": "IN",
          "name": "India",
          "phone_code": 91
        },
        {
          "id": 102,
          "sort_name": "ID",
          "name": "Indonesia",
          "phone_code": 62
        },
        {
          "id": 103,
          "sort_name": "IR",
          "name": "Iran",
          "phone_code": 98
        },
        {
          "id": 104,
          "sort_name": "IQ",
          "name": "Iraq",
          "phone_code": 964
        },
        {
          "id": 105,
          "sort_name": "IE",
          "name": "Ireland",
          "phone_code": 353
        },
        {
          "id": 106,
          "sort_name": "IL",
          "name": "Israel",
          "phone_code": 972
        },
        {
          "id": 107,
          "sort_name": "IT",
          "name": "Italy",
          "phone_code": 39
        },
        {
          "id": 108,
          "sort_name": "JM",
          "name": "Jamaica",
          "phone_code": 1876
        },
        {
          "id": 109,
          "sort_name": "JP",
          "name": "Japan",
          "phone_code": 81
        },
        {
          "id": 110,
          "sort_name": "XJ",
          "name": "Jersey",
          "phone_code": 44
        },
        {
          "id": 111,
          "sort_name": "JO",
          "name": "Jordan",
          "phone_code": 962
        },
        {
          "id": 112,
          "sort_name": "KZ",
          "name": "Kazakhstan",
          "phone_code": 7
        },
        {
          "id": 113,
          "sort_name": "KE",
          "name": "Kenya",
          "phone_code": 254
        },
        {
          "id": 114,
          "sort_name": "KI",
          "name": "Kiribati",
          "phone_code": 686
        },
        {
          "id": 115,
          "sort_name": "KP",
          "name": "Korea North",
          "phone_code": 850
        },
        {
          "id": 116,
          "sort_name": "KR",
          "name": "Korea South",
          "phone_code": 82
        },
        {
          "id": 117,
          "sort_name": "KW",
          "name": "Kuwait",
          "phone_code": 965
        },
        {
          "id": 118,
          "sort_name": "KG",
          "name": "Kyrgyzstan",
          "phone_code": 996
        },
        {
          "id": 119,
          "sort_name": "LA",
          "name": "Laos",
          "phone_code": 856
        },
        {
          "id": 120,
          "sort_name": "LV",
          "name": "Latvia",
          "phone_code": 371
        },
        {
          "id": 121,
          "sort_name": "LB",
          "name": "Lebanon",
          "phone_code": 961
        },
        {
          "id": 122,
          "sort_name": "LS",
          "name": "Lesotho",
          "phone_code": 266
        },
        {
          "id": 123,
          "sort_name": "LR",
          "name": "Liberia",
          "phone_code": 231
        },
        {
          "id": 124,
          "sort_name": "LY",
          "name": "Libya",
          "phone_code": 218
        },
        {
          "id": 125,
          "sort_name": "LI",
          "name": "Liechtenstein",
          "phone_code": 423
        },
        {
          "id": 126,
          "sort_name": "LT",
          "name": "Lithuania",
          "phone_code": 370
        },
        {
          "id": 127,
          "sort_name": "LU",
          "name": "Luxembourg",
          "phone_code": 352
        },
        {
          "id": 128,
          "sort_name": "MO",
          "name": "Macau S.A.R.",
          "phone_code": 853
        },
        {
          "id": 129,
          "sort_name": "MK",
          "name": "Macedonia",
          "phone_code": 389
        },
        {
          "id": 130,
          "sort_name": "MG",
          "name": "Madagascar",
          "phone_code": 261
        },
        {
          "id": 131,
          "sort_name": "MW",
          "name": "Malawi",
          "phone_code": 265
        },
        {
          "id": 132,
          "sort_name": "MY",
          "name": "Malaysia",
          "phone_code": 60
        },
        {
          "id": 133,
          "sort_name": "MV",
          "name": "Maldives",
          "phone_code": 960
        },
        {
          "id": 134,
          "sort_name": "ML",
          "name": "Mali",
          "phone_code": 223
        },
        {
          "id": 135,
          "sort_name": "MT",
          "name": "Malta",
          "phone_code": 356
        },
        {
          "id": 136,
          "sort_name": "XM",
          "name": "Man (Isle of)",
          "phone_code": 44
        },
        {
          "id": 137,
          "sort_name": "MH",
          "name": "Marshall Islands",
          "phone_code": 692
        },
        {
          "id": 138,
          "sort_name": "MQ",
          "name": "Martinique",
          "phone_code": 596
        },
        {
          "id": 139,
          "sort_name": "MR",
          "name": "Mauritania",
          "phone_code": 222
        },
        {
          "id": 140,
          "sort_name": "MU",
          "name": "Mauritius",
          "phone_code": 230
        },
        {
          "id": 141,
          "sort_name": "YT",
          "name": "Mayotte",
          "phone_code": 269
        },
        {
          "id": 142,
          "sort_name": "MX",
          "name": "Mexico",
          "phone_code": 52
        },
        {
          "id": 143,
          "sort_name": "FM",
          "name": "Micronesia",
          "phone_code": 691
        },
        {
          "id": 144,
          "sort_name": "MD",
          "name": "Moldova",
          "phone_code": 373
        },
        {
          "id": 145,
          "sort_name": "MC",
          "name": "Monaco",
          "phone_code": 377
        },
        {
          "id": 146,
          "sort_name": "MN",
          "name": "Mongolia",
          "phone_code": 976
        },
        {
          "id": 147,
          "sort_name": "MS",
          "name": "Montserrat",
          "phone_code": 1664
        },
        {
          "id": 148,
          "sort_name": "MA",
          "name": "Morocco",
          "phone_code": 212
        },
        {
          "id": 149,
          "sort_name": "MZ",
          "name": "Mozambique",
          "phone_code": 258
        },
        {
          "id": 150,
          "sort_name": "MM",
          "name": "Myanmar",
          "phone_code": 95
        },
        {
          "id": 151,
          "sort_name": "NA",
          "name": "Namibia",
          "phone_code": 264
        },
        {
          "id": 152,
          "sort_name": "NR",
          "name": "Nauru",
          "phone_code": 674
        },
        {
          "id": 153,
          "sort_name": "NP",
          "name": "Nepal",
          "phone_code": 977
        },
        {
          "id": 154,
          "sort_name": "AN",
          "name": "Netherlands Antilles",
          "phone_code": 599
        },
        {
          "id": 155,
          "sort_name": "NL",
          "name": "Netherlands The",
          "phone_code": 31
        },
        {
          "id": 156,
          "sort_name": "NC",
          "name": "New Caledonia",
          "phone_code": 687
        },
        {
          "id": 157,
          "sort_name": "NZ",
          "name": "New Zealand",
          "phone_code": 64
        },
        {
          "id": 158,
          "sort_name": "NI",
          "name": "Nicaragua",
          "phone_code": 505
        },
        {
          "id": 159,
          "sort_name": "NE",
          "name": "Niger",
          "phone_code": 227
        },
        {
          "id": 160,
          "sort_name": "NG",
          "name": "Nigeria",
          "phone_code": 234
        },
        {
          "id": 161,
          "sort_name": "NU",
          "name": "Niue",
          "phone_code": 683
        },
        {
          "id": 162,
          "sort_name": "NF",
          "name": "Norfolk Island",
          "phone_code": 672
        },
        {
          "id": 163,
          "sort_name": "MP",
          "name": "Northern Mariana Islands",
          "phone_code": 1670
        },
        {
          "id": 164,
          "sort_name": "NO",
          "name": "Norway",
          "phone_code": 47
        },
        {
          "id": 165,
          "sort_name": "OM",
          "name": "Oman",
          "phone_code": 968
        },
        {
          "id": 166,
          "sort_name": "PK",
          "name": "Pakistan",
          "phone_code": 92
        },
        {
          "id": 167,
          "sort_name": "PW",
          "name": "Palau",
          "phone_code": 680
        },
        {
          "id": 168,
          "sort_name": "PS",
          "name": "Palestinian Territory Occupied",
          "phone_code": 970
        },
        {
          "id": 169,
          "sort_name": "PA",
          "name": "Panama",
          "phone_code": 507
        },
        {
          "id": 170,
          "sort_name": "PG",
          "name": "Papua new Guinea",
          "phone_code": 675
        },
        {
          "id": 171,
          "sort_name": "PY",
          "name": "Paraguay",
          "phone_code": 595
        },
        {
          "id": 172,
          "sort_name": "PE",
          "name": "Peru",
          "phone_code": 51
        },
        {
          "id": 173,
          "sort_name": "PH",
          "name": "Philippines",
          "phone_code": 63
        },
        {
          "id": 174,
          "sort_name": "PN",
          "name": "Pitcairn Island",
          "phone_code": 0
        },
        {
          "id": 175,
          "sort_name": "PL",
          "name": "Poland",
          "phone_code": 48
        },
        {
          "id": 176,
          "sort_name": "PT",
          "name": "Portugal",
          "phone_code": 351
        },
        {
          "id": 177,
          "sort_name": "PR",
          "name": "Puerto Rico",
          "phone_code": 1787
        },
        {
          "id": 178,
          "sort_name": "QA",
          "name": "Qatar",
          "phone_code": 974
        },
        {
          "id": 179,
          "sort_name": "RE",
          "name": "Reunion",
          "phone_code": 262
        },
        {
          "id": 180,
          "sort_name": "RO",
          "name": "Romania",
          "phone_code": 40
        },
        {
          "id": 181,
          "sort_name": "RU",
          "name": "Russia",
          "phone_code": 70
        },
        {
          "id": 182,
          "sort_name": "RW",
          "name": "Rwanda",
          "phone_code": 250
        },
        {
          "id": 183,
          "sort_name": "SH",
          "name": "Saint Helena",
          "phone_code": 290
        },
        {
          "id": 184,
          "sort_name": "KN",
          "name": "Saint Kitts And Nevis",
          "phone_code": 1869
        },
        {
          "id": 185,
          "sort_name": "LC",
          "name": "Saint Lucia",
          "phone_code": 1758
        },
        {
          "id": 186,
          "sort_name": "PM",
          "name": "Saint Pierre and Miquelon",
          "phone_code": 508
        },
        {
          "id": 187,
          "sort_name": "VC",
          "name": "Saint Vincent And The Grenadines",
          "phone_code": 1784
        },
        {
          "id": 188,
          "sort_name": "WS",
          "name": "Samoa",
          "phone_code": 684
        },
        {
          "id": 189,
          "sort_name": "SM",
          "name": "San Marino",
          "phone_code": 378
        },
        {
          "id": 190,
          "sort_name": "ST",
          "name": "Sao Tome and Principe",
          "phone_code": 239
        },
        {
          "id": 191,
          "sort_name": "SA",
          "name": "Saudi Arabia",
          "phone_code": 966
        },
        {
          "id": 192,
          "sort_name": "SN",
          "name": "Senegal",
          "phone_code": 221
        },
        {
          "id": 193,
          "sort_name": "RS",
          "name": "Serbia",
          "phone_code": 381
        },
        {
          "id": 194,
          "sort_name": "SC",
          "name": "Seychelles",
          "phone_code": 248
        },
        {
          "id": 195,
          "sort_name": "SL",
          "name": "Sierra Leone",
          "phone_code": 232
        },
        {
          "id": 196,
          "sort_name": "SG",
          "name": "Singapore",
          "phone_code": 65
        },
        {
          "id": 197,
          "sort_name": "SK",
          "name": "Slovakia",
          "phone_code": 421
        },
        {
          "id": 198,
          "sort_name": "SI",
          "name": "Slovenia",
          "phone_code": 386
        },
        {
          "id": 199,
          "sort_name": "XG",
          "name": "Smaller Territories of the UK",
          "phone_code": 44
        },
        {
          "id": 200,
          "sort_name": "SB",
          "name": "Solomon Islands",
          "phone_code": 677
        },
        {
          "id": 201,
          "sort_name": "SO",
          "name": "Somalia",
          "phone_code": 252
        },
        {
          "id": 202,
          "sort_name": "ZA",
          "name": "South Africa",
          "phone_code": 27
        },
        {
          "id": 203,
          "sort_name": "GS",
          "name": "South Georgia",
          "phone_code": 0
        },
        {
          "id": 204,
          "sort_name": "SS",
          "name": "South Sudan",
          "phone_code": 211
        },
        {
          "id": 205,
          "sort_name": "ES",
          "name": "Spain",
          "phone_code": 34
        },
        {
          "id": 206,
          "sort_name": "LK",
          "name": "Sri Lanka",
          "phone_code": 94
        },
        {
          "id": 207,
          "sort_name": "SD",
          "name": "Sudan",
          "phone_code": 249
        },
        {
          "id": 208,
          "sort_name": "SR",
          "name": "Suriname",
          "phone_code": 597
        },
        {
          "id": 209,
          "sort_name": "SJ",
          "name": "Svalbard And Jan Mayen Islands",
          "phone_code": 47
        },
        {
          "id": 210,
          "sort_name": "SZ",
          "name": "Swaziland",
          "phone_code": 268
        },
        {
          "id": 211,
          "sort_name": "SE",
          "name": "Sweden",
          "phone_code": 46
        },
        {
          "id": 212,
          "sort_name": "CH",
          "name": "Switzerland",
          "phone_code": 41
        },
        {
          "id": 213,
          "sort_name": "SY",
          "name": "Syria",
          "phone_code": 963
        },
        {
          "id": 214,
          "sort_name": "TW",
          "name": "Taiwan",
          "phone_code": 886
        },
        {
          "id": 215,
          "sort_name": "TJ",
          "name": "Tajikistan",
          "phone_code": 992
        },
        {
          "id": 216,
          "sort_name": "TZ",
          "name": "Tanzania",
          "phone_code": 255
        },
        {
          "id": 217,
          "sort_name": "TH",
          "name": "Thailand",
          "phone_code": 66
        },
        {
          "id": 218,
          "sort_name": "TG",
          "name": "Togo",
          "phone_code": 228
        },
        {
          "id": 219,
          "sort_name": "TK",
          "name": "Tokelau",
          "phone_code": 690
        },
        {
          "id": 220,
          "sort_name": "TO",
          "name": "Tonga",
          "phone_code": 676
        },
        {
          "id": 221,
          "sort_name": "TT",
          "name": "Trinidad And Tobago",
          "phone_code": 1868
        },
        {
          "id": 222,
          "sort_name": "TN",
          "name": "Tunisia",
          "phone_code": 216
        },
        {
          "id": 223,
          "sort_name": "TR",
          "name": "Turkey",
          "phone_code": 90
        },
        {
          "id": 224,
          "sort_name": "TM",
          "name": "Turkmenistan",
          "phone_code": 7370
        },
        {
          "id": 225,
          "sort_name": "TC",
          "name": "Turks And Caicos Islands",
          "phone_code": 1649
        },
        {
          "id": 226,
          "sort_name": "TV",
          "name": "Tuvalu",
          "phone_code": 688
        },
        {
          "id": 227,
          "sort_name": "UG",
          "name": "Uganda",
          "phone_code": 256
        },
        {
          "id": 228,
          "sort_name": "UA",
          "name": "Ukraine",
          "phone_code": 380
        },
        {
          "id": 229,
          "sort_name": "AE",
          "name": "United Arab Emirates",
          "phone_code": 971
        },
        {
          "id": 230,
          "sort_name": "GB",
          "name": "United Kingdom",
          "phone_code": 44
        },
        {
          "id": 231,
          "sort_name": "US",
          "name": "United States",
          "phone_code": 1
        },
        {
          "id": 232,
          "sort_name": "UM",
          "name": "United States Minor Outlying Islands",
          "phone_code": 1
        },
        {
          "id": 233,
          "sort_name": "UY",
          "name": "Uruguay",
          "phone_code": 598
        },
        {
          "id": 234,
          "sort_name": "UZ",
          "name": "Uzbekistan",
          "phone_code": 998
        },
        {
          "id": 235,
          "sort_name": "VU",
          "name": "Vanuatu",
          "phone_code": 678
        },
        {
          "id": 236,
          "sort_name": "VA",
          "name": "Vatican City State (Holy See)",
          "phone_code": 39
        },
        {
          "id": 237,
          "sort_name": "VE",
          "name": "Venezuela",
          "phone_code": 58
        },
        {
          "id": 238,
          "sort_name": "VN",
          "name": "Vietnam",
          "phone_code": 84
        },
        {
          "id": 239,
          "sort_name": "VG",
          "name": "Virgin Islands (British)",
          "phone_code": 1284
        },
        {
          "id": 240,
          "sort_name": "VI",
          "name": "Virgin Islands (US)",
          "phone_code": 1340
        },
        {
          "id": 241,
          "sort_name": "WF",
          "name": "Wallis And Futuna Islands",
          "phone_code": 681
        },
        {
          "id": 242,
          "sort_name": "EH",
          "name": "Western Sahara",
          "phone_code": 212
        },
        {
          "id": 243,
          "sort_name": "YE",
          "name": "Yemen",
          "phone_code": 967
        },
        {
          "id": 244,
          "sort_name": "YU",
          "name": "Yugoslavia",
          "phone_code": 38
        },
        {
          "id": 245,
          "sort_name": "ZM",
          "name": "Zambia",
          "phone_code": 260
        },
        {
          "id": 246,
          "sort_name": "ZW",
          "name": "Zimbabwe",
          "phone_code": 26
        }
    
      ])
    };