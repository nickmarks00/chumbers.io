#! /usr/bin/bash

in_file=$1
cwd=$(pwd)

echo "Running markdown formatting on file $in_file..."
echo "-----------------------------------------------"
echo "Working in directory $cwd..."
echo "-----------------------------------------------"


inFile=$1
destFile=${1%.*}
outFile="${destFile}_cleaned.md"

cp -- "$inFile" "${outFile}"


sed -i 's/\^\^\([^^]*\)\^\^/\<Highlight text="\1" \/\>/g' "$outFile"

sed -i 's/{{\[\[video\]\]: \([^}]*\)}}\([a-zA-Z .]*\)/\<VideoEmbed url="\1" caption="\2"\/\>/g' "$outFile"

