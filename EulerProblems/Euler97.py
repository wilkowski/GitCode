def pow_mod_prod(var, power, mod, prod):
    if(power == 0):
        return prod
    if(power %2 == 1):
        return pow_mod_prod(var, power-1, mod, (prod*var) %mod)
    else:
        return pow_mod_prod(var*var %mod, power/2, mod, prod)

def pow_mod(var, power, mod):
    return pow_mod_prod(var, power, mod, 1)
    
print (28433*pow_mod(2,7830457,10000000000) +1) %10000000000