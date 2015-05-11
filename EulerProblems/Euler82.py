import re
from random import random

file = open('matrix.txt','r')
pattern = re.compile('[\\w]+') #matches alpha numeric in double quotes
mat_list = re.findall(pattern, file.read())

for i in range(0,len(mat_list)):
    mat_list[i] = int(mat_list[i])

def get_elem(x,y):
    return mat_list[x+80*y]
    
print get_elem(0,0), get_elem(1,0), get_elem(0,1)

min_matrix = [[False]*80 for i in range(0,80)]

class Heap_Node(object):
    def __init__(self, val):
        self.left = None
        self.right = None
        self.data = val
        
#consists of triples: value, x coord, y coord

heap_root = None

def add_to_heap(object):
    #print "addin", object
    new_node = Heap_Node(object)
    global heap_root
    object_val = object[0]
    if (heap_root == None) or (object_val < heap_root.data[0]):
        old_root = heap_root
        heap_root = new_node
        heap_root.data = object
        heap_root.right = old_root
    else:
        previous_node = heap_root

        while(True):
            if(previous_node.right == None):
                previous_node.right = new_node
                break
            elif(previous_node.left == None):
                previous_node.left = new_node
                break
            if(random() %2 == 0):
                next_node = previous_node.right
                if(object_val < next_node.data[0]):
                    previous_node.right = new_node
                    new_node.left = next_node
                    break
                previous_node = next_node
            else:
                next_node = previous_node.left
                if(object_val < next_node.data[0]):
                    previous_node.left = new_node
                    new_node.right = next_node
                    break
                previous_node = next_node
                
def pop_from_heap():
    #print "poppin", heap_root.data
    global heap_root
    return_data = heap_root.data
    done = False
    remove_node = None
    parent_node = heap_root
    right_dir = True
    
    if(heap_root.right == None):
        heap_root = heap_root.left
    elif(heap_root.left == None):
        heap_root = heap_root.right
    else:
        if(heap_root.left.data[0] < heap_root.right.data[0]):
            heap_root.data = heap_root.left.data
            remove_node = heap_root.left
            parent_node = heap_root
            right_dir = False
        else:
            heap_root.data = heap_root.right.data
            remove_node = heap_root.right
            parent_node = heap_root
            right_dir = True
    
    while remove_node != None:
        if(remove_node.right == None):
            if(right_dir):
                parent_node.right = remove_node.left
            else:
                parent_node.left = remove_node.left
            remove_node = None
        elif(remove_node.left == None):
            if(right_dir):
                parent_node.right = remove_node.right
            else:
                parent_node.left = remove_node.right
            remove_node = None
        else:
            if(remove_node.left.data[0] < remove_node.right.data[0]):
                remove_node.data = remove_node.left.data
                parent_node = remove_node
                remove_node = remove_node.left
                right_dir = False
            else:
                remove_node.data = remove_node.right.data
                parent_node = remove_node
                remove_node = remove_node.right
                right_dir = True
            
    return return_data
    
#element_list = [0]*80

for y in range(0,80):
    min_matrix[0][y] = get_elem(0,y)
    #elem_list[y] = [min_matrix[x][0], x,0]
    add_to_heap([min_matrix[0][y],0,y])
    
def show_tree(node,depth):
    if node!= None:
        print "|"*depth, node.data
        show_tree(node.left, depth+1)
        show_tree(node.right, depth+1)
show_tree(heap_root,0)
    
while(heap_root != None):
    #print " "
    #show_tree(heap_root,0)
    min_elem = pop_from_heap() 
    #print "pop"
    #show_tree(heap_root,0)
    elem_val = min_elem[0]
    elem_x = min_elem[1]
    elem_y = min_elem[2]
    if elem_x < 79 and (min_matrix[elem_x+1][elem_y] == False):
        val = get_elem(elem_x+1, elem_y) + elem_val
        min_matrix[elem_x+1][elem_y] = val
        add_to_heap([val,elem_x+1,elem_y])
    if elem_y > 0 and (min_matrix[elem_x][elem_y-1] == False):
        val = get_elem(elem_x, elem_y-1) + elem_val
        min_matrix[elem_x][elem_y-1] = val
        add_to_heap([val,elem_x,elem_y-1])
    if elem_y < 79 and (min_matrix[elem_x][elem_y+1] == False):
        val = get_elem(elem_x, elem_y+1) + elem_val
        min_matrix[elem_x][elem_y+1] = val
        add_to_heap([val,elem_x,elem_y+1])
        
min_val = min_matrix[79][0]
for y in range(0,80):
    print min_matrix[79][y], y
    min_val = min(min_val, min_matrix[79][y])
    
print min_val
    