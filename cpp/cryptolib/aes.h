#ifndef AES_CRYPTO_LIB
#define AES_CRYPTO_LIB
#include <string>
#include "cryptoclass.h"

class AESCrypto : public CryptoClass{
public:
  virtual bool genKey(const std::string& privateKeyFile, const std::string& publicKeyFile);
  virtual bool loadKey(const std::string& privateKeyFile, const std::string& publicKeyFile);
  virtual bool encrypt(const byte* message, int length, byte*& newmessage, int& newlength);
  virtual bool decrypt(const byte* message, int length, byte*& newmessage, int& newlength);  
  virtual int getCryptBlockSize(int plainSize);
};

#endif