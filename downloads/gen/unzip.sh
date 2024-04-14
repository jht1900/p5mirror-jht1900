cd "/Users/jht2/Documents/projects/2024/p5mo/p5mirror-jht1900/downloads/../p5projects"
#
echo unzip 1 "Simulate SoftBody copy-fSUYUL7mJ"
rm -rf "./Simulate SoftBody copy-fSUYUL7mJ"
mkdir "./Simulate SoftBody copy-fSUYUL7mJ"
pushd "./Simulate SoftBody copy-fSUYUL7mJ" > /dev/null
unzip -q "../../downloads/zips/Simulate SoftBody copy-fSUYUL7mJ"
popd > /dev/null
#
echo unzip 2 "Flat memory-3474rEu0V"
rm -rf "./Flat memory-3474rEu0V"
mkdir "./Flat memory-3474rEu0V"
pushd "./Flat memory-3474rEu0V" > /dev/null
unzip -q "../../downloads/zips/Flat memory-3474rEu0V"
popd > /dev/null
#
echo unzip 3 "Lightning trouble-iGWSQiLpX"
rm -rf "./Lightning trouble-iGWSQiLpX"
mkdir "./Lightning trouble-iGWSQiLpX"
pushd "./Lightning trouble-iGWSQiLpX" > /dev/null
unzip -q "../../downloads/zips/Lightning trouble-iGWSQiLpX"
popd > /dev/null
#
echo unzip 4 "Skitter abacus-z75JPb1m"
rm -rf "./Skitter abacus-z75JPb1m"
mkdir "./Skitter abacus-z75JPb1m"
pushd "./Skitter abacus-z75JPb1m" > /dev/null
unzip -q "../../downloads/zips/Skitter abacus-z75JPb1m"
popd > /dev/null
#
echo unzip 5 "Skitter abacus-50XGMdQXY"
rm -rf "./Skitter abacus-50XGMdQXY"
mkdir "./Skitter abacus-50XGMdQXY"
pushd "./Skitter abacus-50XGMdQXY" > /dev/null
unzip -q "../../downloads/zips/Skitter abacus-50XGMdQXY"
popd > /dev/null
#
echo unzip 6 "Skitter abacus-DQ1neg3ZHP"
rm -rf "./Skitter abacus-DQ1neg3ZHP"
mkdir "./Skitter abacus-DQ1neg3ZHP"
pushd "./Skitter abacus-DQ1neg3ZHP" > /dev/null
unzip -q "../../downloads/zips/Skitter abacus-DQ1neg3ZHP"
popd > /dev/null

cd ..
# remove redundant p5.js p5.sound.min.js
rm -f p5projects/*/p5.*
# sync last_updatedAt.txt
cd downloads/json
if [ -e pending_updatedAt.txt ]; then
  rm -f last_updatedAt.txt
  mv pending_updatedAt.txt last_updatedAt.txt
fi