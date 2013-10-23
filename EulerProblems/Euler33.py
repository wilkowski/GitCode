num_product = 1
denom_product = 1 

#right cancel
for c in range(1,10):
    for t in range(1,10):
        for b in range(1,10):
            frac_numerator = 10*t+c
            frac_denominator = 10*b+c
            #frac_numerator / frac_denominator = t/b
            if(frac_denominator>frac_numerator and frac_numerator *b == t*frac_denominator): 
                print frac_numerator, "/", frac_denominator, "=", t, "/", b
                
                
                
#diagonal 1 cancel
for c in range(1,10):
    for t in range(1,10):
        for b in range(1,10):
            frac_numerator = 10*c+t
            frac_denominator = 10*b+c
            #frac_numerator / frac_denominator = t/b
            if(frac_denominator>frac_numerator and frac_numerator *b == t*frac_denominator): 
                print frac_numerator, "/", frac_denominator, "=", t, "/", b
                
                
#diagonal 2 cancel
for c in range(1,10):
    for t in range(1,10):
        for b in range(1,10):
            frac_numerator = 10*t+c
            frac_denominator = 10*c+b
            #frac_numerator / frac_denominator = t/b
            if(frac_denominator>frac_numerator and frac_numerator *b == t*frac_denominator): 
                print frac_numerator, "/", frac_denominator, "=", t, "/", b
                
#left cancel
for c in range(1,10):
    for t in range(1,10):
        for b in range(1,10):
            frac_numerator = 10*c+t
            frac_denominator = 10*c+b
            #frac_numerator / frac_denominator = t/b
            if(frac_denominator>frac_numerator and frac_numerator *b == t*frac_denominator): 
                print frac_numerator, "/", frac_denominator, "=", t, "/", b
                
                
                
#rest is easy enough to do manually