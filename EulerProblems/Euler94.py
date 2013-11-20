#triangle of sides n,n,n-1 will have height of sqrt(n^2 - (n-1/2)^2)
#triangle of sides 2n+1,2n+1,2n has height sqrt(4n^2+4n+1 - n^2) = sqrt(3n^2+4n+1)
#triangle of sides 2n+1,2n+1,2n+2 has height sqrt(4n^2+4n+1 - (n+1)^2) = sqrt(3n^2 +2n) = sqrt(n(3n+2))

#right triangles have sides of c*(m^2+n^2), c*2m*n, c*(m^2-n^2)
#we want ones where c*(m^2+n^2) =  2* c*(m^2-n^2) +-1 or c*(m^2+n^2) = 2*c*2m*n+-1
#in all cases c must divide 1 so c=1
#(m^2+n^2) =  2*(m^2-n^2) +-1 implies 3*n^2 == m^2 +-1
#n is about .57735m
#(m^2+n^2) = 4*m*n +- 1
#n is about .26795m (without the +-1)

def gcd(a,b):
    if a%b == 0:
        return b
    else:
        return gcd(b,a%b) 
        
total_perimiter = 0

for m in range(1,32000): #roughly sqrt(1000000000)
    search_area = m/200+2
    for n in range(max(int(.26795*m)-search_area,1), min(m,int(.26795*m)+search_area)):
        if((m+n)%2 == 1 and gcd(m,n) == 1):
            hypotenuse = m*m+n*n
            short_side = 2*m*n
            diff = 2*short_side - hypotenuse
            if(diff == 1 or diff == -1):
                perim = 2*short_side + 2*hypotenuse
                if perim <= 1000000000:
                    total_perimiter += perim
    for n in range(max(int(.57735*m)-search_area,1), min(m,int(.57735*m)+search_area)):
        if((m+n)%2 == 1 and gcd(m,n) == 1):
            hypotenuse = m*m+n*n
            short_side = m*m-n*n
            diff = 2*short_side - hypotenuse
            if(diff == 1 or diff == -1):
                perim = 2*short_side + 2*hypotenuse
                if perim <= 1000000000:
                    total_perimiter += perim
                
print "total", total_perimiter