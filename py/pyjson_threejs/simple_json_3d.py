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

    def example(self):
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
        print Z.shape
        return Z

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
        with io.open('3d.json', 'w', encoding ='utf-8') as f:
              for i in range(sizemat):
                  data.append({'x':int(xflat[i]),'y':int(yflat[i]),'z': zflat[i] })
              f.write(unicode('data = '))
              f.write(unicode(json.dumps(data, ensure_ascii = False))) # write in file in json format.

if __name__=='__main__':
    tj = Three_json()
    tj.plot_shape_3d(tj.example())