import json
import numpy as np
import io

class Three_json(object):
    '''
    Class for producing a json file used for THree.js 3D representation of a numpy 2D array.
    Usage:
        * Instantiate the class
        * call the method : plot_shape_3d(Z) with Z being the numpy 2D array.
    '''
    def __init__(self, ampl=None):
        self.ampl = ampl # Amplitude for modifying the height.

    def example_0(self):
        '''
        Produces a 2D numpy dataset object Z[i,j]
        '''
        self.ampl = 50
        self.Nx = 300
        self.Ny = 300
        Z = np.empty((self.Nx, self.Ny))
        for i in range(self.Nx):
            for j in range(self.Ny):
                Z[i,j] = (np.sin(i*np.pi/float(self.Nx)*4)+np.sin(j*np.pi/float(self.Ny)*4))
        print (Z.shape)
        return Z

    def example_1(self):
        '''
        Produces a 2D numpy dataset object Z[i,j]
        '''
        self.ampl = 50
        self.Nx = 300
        self.Ny = 300
        Z = np.empty((self.Nx, self.Ny))
        for i in range(self.Nx):
            for j in range(self.Ny):
                Z[i,j] = (np.sin(i*np.pi/float(self.Nx)*4)*self.Nx/100.0+np.sin(j*np.pi/float(self.Ny)*4)*self.Ny/100.0)
        print (Z.shape)
        return Z

    def example_2(self):
        '''
        Produces a 2D numpy dataset object Z[i,j]
        '''
        self.ampl = 50
        self.Nx = 300
        self.Ny = 300
        Z = np.empty((self.Nx, self.Ny))
        for i in range(self.Nx):
            for j in range(self.Ny):
                Z[i,j] = 0.05*np.sin(i**2*np.pi/float(self.Nx)*4 + j**2*np.pi/float(self.Ny)*4)
        print (Z.shape)
        return Z

    def example_3(self):
        '''
        Produces Hills in a 2D numpy dataset object Z[i,j]
        '''
        N = 500
        sub = 50
        self.Nx = N
        self.Ny = N
        nbhill = 20
        low = 2*sub
        up = N-2*sub
        Z = np.empty((self.Nx, self.Ny))
        for n in range(nbhill):
            self.ampl = 10*np.random.randn()
            ri = np.random.randint(low,up)
            rj = np.random.randint(low,up)
            for i in range(sub):
                for j in range(sub):
                    Z[i+ri,j+rj] = self.ampl*(np.sin(2*i*np.pi/sub) + np.sin(2*j*np.pi/sub))
        return Z

    def example_4(self):
        '''
        Produces a 2D numpy dataset object Z[i,j]
        '''
        N = 500
        sub = 10
        self.Nx = N
        self.Ny = N
        nbpts = 20
        low = 2*sub
        up = N-2*sub
        Z = np.empty((self.Nx, self.Ny))
        pos = [100, 100]
        step = 6
        for n in range(nbpts):
            self.ampl = 3 # *np.random.randn()
            ri = np.random.randint(low,up)
            rj = np.random.randint(low,up)
            pos[0]+=step
            pos[1]+=step
            for i in range(sub):
                for j in range(sub):
                    Z[i+pos[0],j+pos[1]] = self.ampl*(np.sin(2*i*np.pi/sub)**2 + np.sin(2*j*np.pi/sub)**2)
        return Z

    def example_5(self):
        '''
        Produces Hills as a 2D numpy dataset object Z[i,j]
        '''
        N = 500
        sub = 10
        self.Nx = N
        self.Ny = N
        nbpts = 20
        low = 2*sub
        up = N-2*sub
        Z = np.empty((self.Nx, self.Ny))
        pos = [100, 100]
        step = 6
        for n in range(nbpts):
            self.ampl = 3 # *np.random.randn()
            ri = np.random.randint(low,up)
            rj = np.random.randint(low,up)
            pos[0]+=step
            pos[1]+=step
            for i in range(sub):
                for j in range(sub):
                    Z[i+pos[0],j+pos[1]] = self.ampl*(np.sin(2*i*np.pi/sub) + np.sin(2*j*np.pi/sub))
        return Z

    def example_6(self):
        '''
        Produces a 2D numpy dataset object Z[i,j]
        '''
        N = 500
        sub = 10
        self.Nx = N
        self.Ny = N
        nbpts = 20
        low = 2*sub
        up = N-2*sub
        Z = np.empty((self.Nx, self.Ny))
        pos = [100, 100]
        step = 2
        for n in range(nbpts):
            self.ampl = 3 # *np.random.randn()
            ri = np.random.randint(low,up)
            rj = np.random.randint(low,up)
            pos[0]+=step
            pos[1]+=step
            for i in range(sub):
                for j in range(sub):
                    Z[i+pos[0],j+pos[1]] = np.abs(self.ampl*(np.sin(2*i*np.pi/sub) + np.sin(2*j*np.pi/sub)))
        return Z

    def example_7(self):
        '''
        Parallelepiped
        '''
        N = 500
        self.Nx = N
        self.Ny = N
        Z = np.empty((self.Nx, self.Ny))
        pos = [100, 100]
        self.ampl = 3 # *np.random.randn()
        Z[100:120,100:200] = 10
        return Z

    def example_8(self, nbwalls= 10):
        '''
        Make walls
        '''
        N = 500
        sub = 10
        self.Nx = N
        self.Ny = N
        Z = np.empty((self.Nx, self.Ny))
        self.ampl = 1 #

        def make_walls(Z, nbwalls, debug=2):
            pos = [100, 100]
            width = 2
            lmin, lmax = 4, 8
            print('in make_walls')
            mode = None
            for n in range(nbwalls):
                posold = pos.copy()
                sgn = (-1)**(np.random.randint(2,11))
                direc = np.random.randint(2,11)
                ######
                if direc%2 == 0:  # x direction
                    print('x')
                    ri = 5*sgn # *np.random.randint(lmin, lmax)
                    if mode == 'x':
                        if debug>0:
                            print('continue x')
                        pos[0]+= np.sign(ri_old)*abs(ri)
                    else:
                        pos[0] += ri
                        ri_old = ri
                    if debug>1:
                        print('ri ', ri)
                        print("posold ", posold)
                        print("pos ", pos)
                    posmin = min(posold[0],pos[0])
                    posmax = max(posold[0],pos[0])
                    Z[posmin:posmax, posold[1]:posold[1]+width] = 10
                    mode = 'x'

                else:            # y direction
                    print('y')
                    rj = 5*sgn # *np.random.randint(lmin, lmax)
                    if mode == 'y':
                        if debug>0:
                            print('continue y')
                        pos[1]+= np.sign(rj_old)*abs(rj)
                    else:
                        pos[1] += rj
                        rj_old = rj
                    if debug>1:
                        print('rj ', rj)
                        print("posold ", posold)
                        print("pos ", pos)
                    posmin = min(posold[1],pos[1])
                    posmax = max(posold[1],pos[1])
                    Z[posold[0]:posold[0]+width, posmin:posmax] = 10
                    mode = 'y'

            return Z
        return make_walls(Z, nbwalls)

    def plot_shape_3d(self, Z):
        '''
        Makes the json file used by three-json.html for plotting a shape in 3D from a 2D numpy array containing the z values.
        Z : numpy 2D array containing the altitudes.
        '''
        data = [] # final json data
        dimx, dimy = Z.shape[0], Z.shape[1]
        xflat = np.array([np.arange(dimx) for i in range(dimy)]).flatten() # flattening x
        yflat = np.array([np.ones(dimx)*i for i in range(dimy)]).flatten() # flattening y
        zflat = self.ampl*Z.flatten()   # Heights with amplitude
        sizemat = xflat.size
        try:
            with io.open('3d.json', 'w', encoding ='utf-8') as f:
                  for i in range(sizemat):
                      data.append({'x':int(xflat[i]),'y':int(yflat[i]),'z': zflat[i] })
                  f.write(unicode('data = '))
                  f.write(unicode(json.dumps(data, ensure_ascii = False))) # write in file in json format.
        except:
            with io.open('3d.json', 'w') as f:
                  for i in range(sizemat):
                      data.append({'x':int(xflat[i]),'y':int(yflat[i]),'z': zflat[i] })
                  f.write('data = ')
                  f.write(json.dumps(data, ensure_ascii = False)) # write in file in json format.

if __name__=='__main__':
    tj = Three_json()
    tj.plot_shape_3d(tj.example_8(nbwalls= 100))
