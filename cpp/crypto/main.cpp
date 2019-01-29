#include <iostream>
#include <stdio.h>
#include "ecc.h"
using namespace std;

int main(int argc, char ** argv) {
  // command: 
  if(argc > 3){
    string cmd = argv[1];
    string encrypt_type = argv[2];
    if(cmd == "encrypt"){
      string input_type = argc > 3 ? argv[3] : "";      
      string file_intput = argc > 4 ? argv[4] : "";
      string file_output = argc > 5 ? argv[5] : "";
      string private_file = argc > 6 ? argv[6] : "";

    }else if(cmd == "genkey"){
      string private_key_file = argc > 3 ? argv[3]: "";
      string public_key_file = argc > 4 ? argv[4] : "";
      CryptoLib clib(encrypt_type);
      clib.genKey(private_key_file, public_key_file);
    }    
    //main_ecc(argc, argv);
  }
  return 0;
}

void help(){
  cout << "crypto encrypt [ecc|aes] file fileinput fileoutput [privatekey] " << endl;
  cout << "crypto genkey [ecc|aes] privatekeyFile publickeyFile " << endl;
}
