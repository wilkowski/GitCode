

dayOfWeek = 2 #sunday is 1
dayOfMonth = 1
year = 1900

month = 0

sundays_on_first = 0
#January Febuary March April May June July August September October November December
days_in_month = [31,28,31,30,31,30,31,31,30,31,30,31]
#Feb is [1]
while(year < 2001):
    dayOfWeek += 1
    dayOfMonth += 1
    if(dayOfWeek == 8):
        dayOfWeek = 1
    if(dayOfMonth > days_in_month[month]):
        month +=1
        dayOfMonth = 1;
        if(month == 12):
            year +=1
            month = 0;
            if((year%4 == 0 and (not year%100 == 0)) or year%400 == 0):
                days_in_month[1] = 29
            else:
                days_in_month[1] = 28
        if(dayOfMonth == 1 and dayOfWeek == 1 and year >1900):
            sundays_on_first +=1
print "Sundays:", sundays_on_first