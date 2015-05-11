
best_x = 0
square = 2

def get_convergent(term, sequence):
    period = len(sequence)-1
    numerator = 0
    denominator = 1
    if(term%2) != 0:
        numerator = 1
        term = (term-1)/2
    else:
        term = term/2
    
    while term >= 1:
        adder = sequence[(term-1)%period+1]
        new_num = denominator*adder + numerator
        numerator = denominator
        denominator = new_num
        term = term - 1
        
    numerator = numerator + (sequence[0])*denominator
    return [numerator, denominator]
    
#for i in range(0,25):
    #print get_convergent(i,[3,1,1,1,1,6])
    
def gcd(a,b):
    if a%b == 0:
        return b
    else:
        return gcd(b,a%b)
        
nearest_square = 1

for D in range(2,1001):
    term_list = [nearest_square]
    
    numerator = 1
    sub = nearest_square
    denom = 1
    
    #numerator*(sqrt(i) - sub) / denom
    i = D
    if(i == (nearest_square+1)*(nearest_square+1)):
        nearest_square += 1
        
    else:
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

        t = 0
        if D == 13:
            print term_list
            for n in range(0,2):
                #print get_convergent(n,term_list)
                foor = 1
            
        while True:
            frac_pair = get_convergent(t, term_list)
            
            done = False
            x = frac_pair[0]
            y = frac_pair[1]
            equation_val = x*x - D*y*y
            if (equation_val == 1):
                if x > best_x:
                    best_x = x
                    print "new best", D
                    print "equation", str(x)+"^2-"+str(D)+"*"+str(y)+"^2"
                break
            t+=1
            