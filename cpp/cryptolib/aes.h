#ifndef AES_CRYPTO_LIB
#define AES_CRYPTO_LIB
#include <string>
#include "cryptolib.h"

class AESCrypto : public CryptoClass{
public:
  virtual bool genKey(const std::string& privateKeyFile, const std::string& publicKeyFile);
  virtual bool loadKey(const std::string& privateKeyFile, const std::string& publicKeyFile);
  virtual std::string encryptText(const std::string& message);
  virtual std::string decryptText(const std::string& message);
  virtual void encryptFile(const std::string& inputFile, const std::string& outputFile);
  virtual void decryptFile(const std::string& inputFile, const std::string& outputFile);
};

#endif