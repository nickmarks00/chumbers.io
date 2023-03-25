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

# Handling custom highlighting MDX
sed -i 's/\^\^\([^^]*\)\^\^/\<Highlight text="\1" \/\>/g' "$outFile"

# Handling video embed
sed -i 's/{{\[\[video\]\]: \([^}]*\)}}\([a-zA-Z .!,]*\)/\<VideoEmbed url="\1" caption="\2"\/\>/g' "$outFile"

# Handling Roam italics to Markdown italics
sed -i 's/__\(.*\)__/\*\1\*/g' "$outFile"

# Handling $$ environment for \begin types
sed -i 's/\$\$\(\\begin.*\\end{.*}\)\$\$/\n\$\$\n\1\n\$\$/g' "$outFile"

echo "File cleaned succesfully..."

code "$outFile"
