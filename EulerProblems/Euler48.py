def pow_mod_prod(var, power, mod, prod):
    if(power == 0):
        return prod
    if(power %2 == 1):
        return pow_mod_prod(var, power-1, mod, (prod*var) %mod)
    else:
        return pow_mod_prod(var*var %mod, power/2, mod, prod)

def pow_mod(var, power, mod):
    return pow_mod_prod(var, power, mod, 1)
    
    
#for i in range (0,20):
#    print pow_mod(2,i,1000)


run_sum = 0
for i in range(1,1001):
    run_sum = (run_sum + pow_mod(i,i,10000000000))%10000000000
    
print run_sum