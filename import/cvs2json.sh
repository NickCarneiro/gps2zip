#!/bin/bash

# CSV to JSON converter using BASH
# original script from https://gist.github.com/dsliberty/3de707bc656cf757a0cb
# Usage ./csv2json.sh input.csv > output.json

# This script has been customized to convert the "ZIP Code Tabulation
# Areas" file from tab-delimited to the necessary JSON format. Source:
# http://www.census.gov/geo/maps-data/data/gazetteer2017.html

# Common usage:
# ./cvs2json.sh 2017_Gaz_zcta_national.txt > zip_codes_sorted.json

shopt -s extglob

input="${1:-/dev/stdin}"
SEP="	"

[ -z "${input}" ] && printf "No CSV input file specified" && exit 1
[ ! -e "${input}" ] && printf "Unable to locate ${input}" && exit 1

data=$(sed \
	-e '/^$/d' \
	-e 's/GEOID/zip_code/' \
	-e 's/INTPTLAT/latitude/' \
	-e 's/INTPTLONG/longitude/' \
	-e 's/[ ^I]*$//' \
	"${input}")
line_count=$(printf "${data}" | wc -l)

printf "[\n"
row=0
while IFS=$'\n\r' read -r line; do
    if [[ ${row} -eq 0 ]]; then
        IFS="$SEP" read -ra head_items <<< "${line}"
    else
        IFS="$SEP" read -ra line_items <<< "${line}"
        printf "\t{\n"
        col=0
        for item in "${line_items[@]}"; do
            case ${head_items[${col}]} in
                ALAND|AWATER|ALAND_SQMI|AWATER_SQMI)
                    ;;
				*)
					printf  "\t\t\"${head_items[${col}]}\": "
					case ${item} in
						\"\")
							printf "null"
							;;
						\"*\")
							printf "${item}"
							;;
						null|true|false)
							printf "${item}"
							;;
						+([0-9.]))
							no_zero_pad=${item##+(0)}
							printf "${no_zero_pad}"
							;;
						+([-0-9.]))
							printf '%s' "${item}"
							;;
						*)
							printf "\"${item}\""
							;;
					esac
					[[ ${col} -lt ${#head_items[@]}-1 ]] && printf ",\n" || printf "\n"
				;;
            esac
            (( col++ ))
        done
        printf "\t}"
        [[ ${row} -lt ${line_count} ]] && printf ",\n" || printf "\n"
    fi
    (( row++ ))
done <<< "${data}"
printf "]\n"
