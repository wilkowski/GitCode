

ProductList = [False for x in range(0,9876)]
run_sum = 0

#1 digit x 4 digit = 4 digit
for i in range(2,10):
    for j in range(1234,9877):
        prod = i*j
        if(prod < 9877):
            viable = True
            check_range = [False for x in range(0,10)]
            check_range[i] = True
            checker1 = j
            while(checker1 > 0 and viable):
                check_val = checker1%10
                if(check_val == 0 or check_range[check_val]):
                    viable = False
                check_range[check_val] = True
                checker1 = checker1/10
            checker2 = prod
            while(checker2 > 0 and viable):
                check_val = checker2%10
                if(check_val == 0 or check_range[check_val]):
                    viable = False
                check_range[check_val] = True
                checker2 = checker2/10
            if(viable):
                if(not ProductList[prod]):
                    ProductList[prod] = True
                    run_sum += prod
                    print i,"*",j,"=",prod
                
                
#2 digit x 3 digit = 4 digit
for i in range(12,99):
    for j in range(123,988):
        prod = i*j
        if(prod < 9877):
            viable = True
            check_range = [False for x in range(0,10)]
            check_range[i%10] = True
            if(check_range[i/10]):
                viable = False
            check_range[i/10] = True
            checker1 = j
            while(checker1 > 0 and viable):
                check_val = checker1%10
                if(check_val == 0 or check_range[check_val]):
                    viable = False
                check_range[check_val] = True
                checker1 = checker1/10
            checker2 = prod
            while(checker2 > 0 and viable):
                check_val = checker2%10
                if(check_val == 0 or check_range[check_val]):
                    viable = False
                check_range[check_val] = True
                checker2 = checker2/10
            if(viable):
                if(not ProductList[prod]):
                    ProductList[prod] = True
                    run_sum += prod
                    print i,"*",j,"=",prod
                    
                    
print "result", run_sum