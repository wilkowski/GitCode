def gcd(a,b):
    if a%b == 0:
        return b
    else:
        return gcd(b,a%b)
odd_period_count = 0 

nearest_square = 1

for i in range(2,10001):
    if(i == (nearest_square+1)*(nearest_square+1)):
        nearest_square += 1
    else:
        term_list = [nearest_square]
        numerator = 1
        sub = nearest_square
        denom = 1
        
        #numerator*(sqrt(i) - sub) / denom
        
        while(True):
            #numerator*(i - sub^2) / denom(sqrt(i) + sub)
            #1 / (denom(sqrt(i) + sub) / (numerator*(i - sub^2)))
            new_denom = numerator*(i - sub*sub)
            numerator = denom
            div = gcd(numerator,new_denom)
            new_denom = new_denom/div
            numerator = numerator / div
            #(numerator(sqrt(i) + sub) / (new_denom)
            for x in range(0,10000):
                term = sub-x*new_denom
                if term*term > i:
                    term_list = term_list + [x-1]
                    sub = (x-1)*new_denom - sub
                    break
            denom = new_denom
            if(denom == 1):
                break
        #print term_list, "terms for", i
        if len(term_list) %2 == 0: #even because I included start term
            odd_period_count +=1

            
print odd_period_count, "have odd period"