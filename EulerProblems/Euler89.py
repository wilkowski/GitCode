import re

file = open('roman.txt','r')
pattern = re.compile('[\\w]+') #matches alpha numeric in double quotes
file_text = file.read()
wordList = re.findall(pattern, file_text)

shortening_count = 0


iiii_pattern = re.compile('[^V]IIII') 
iiii_count = len(re.findall(iiii_pattern, file_text))
print iiii_count
shortening_count += 2*iiii_count

viiii_pattern = re.compile('VIIII') 
viiii_count = len(re.findall(viiii_pattern, file_text))
print viiii_count
shortening_count += 3*viiii_count

xxxx_pattern = re.compile('[^L]XXXX') 
xxxx_count = len(re.findall(xxxx_pattern, file_text))
print xxxx_count
shortening_count += 2*xxxx_count

lxxxx_pattern = re.compile('LXXXX') 
lxxxx_count = len(re.findall(lxxxx_pattern, file_text))
print lxxxx_count
shortening_count += 3*lxxxx_count

cccc_pattern = re.compile('[^D]CCCC') 
cccc_count = len(re.findall(cccc_pattern, file_text))
print cccc_count
shortening_count += 2*cccc_count

dcccc_pattern = re.compile('DCCCC') 
dcccc_count = len(re.findall(dcccc_pattern, file_text))
print dcccc_count
shortening_count += 3*dcccc_count

print "total result", shortening_count

