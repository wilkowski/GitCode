
run_sum = 0

for i in range(1,1000):
    digits = 0
    xx = i
    while(xx >0):
        digits+=1
        xx = xx/10
    
    palindrome1 = i
    palindrome2 = i
    for n in range(0,digits):
        if n !=0:
            palindrome1 = palindrome1*10+(i/(10**n))%10
        palindrome2 = palindrome2*10+(i/(10**n))%10
        
    p_list = [palindrome1, palindrome2]
    
    for p in p_list:
        pal_base_2 = True
        if(p >= 1000000):
            pal_base_2 = False #only want ones under a million
        xx = p
        digits_2 = 0
        base2_digits = []
        while(xx >0): #order is reversed, doesnt really matter
            base2_digits = base2_digits + [xx%2]
            xx = xx/2
        for t in range(0, len(base2_digits)/2):
            if(base2_digits[t] != base2_digits[len(base2_digits) - 1 - t]):
                pal_base_2 = False
                break
        if(pal_base_2):
            run_sum += p
            print p
            
print "sum_total", run_sum