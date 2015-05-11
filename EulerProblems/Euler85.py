#n by m rectangle:
#rectangles of height n-i by m-j is i*j
#rectangles of height i is sum from 1 to m of i*j
#rectangles of height i is sum from 1 to m of i*m*(m+1)/2

#total number of rectangles is (n)(n+1)/2 (m)(m+1)/2


best_num = 10000000
best_area = 0

for n in range(1,1000000):
    prod_n = (n*(n+1))/2
    if prod_n > 25000000:
        break
    for m in range(1,n):
        num_rectangles = (prod_n*m*(m+1))/2
        if(abs(num_rectangles-2000000) < best_num):
            best_num = abs(num_rectangles-2000000)
            best_area = n*m
        if num_rectangles > 25000000:
            break
            
print best_area, "with dif", best_num