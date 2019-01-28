#ifndef CRYPTO_LIB
#define CRYPTO_LIB
#include <string>
enum CryptoType{
    AES, ECC
};
class CryptoLib
{
public:
  CryptoLib(CryptoType cryptoType);
  CryptoLib(CryptoType cryptoType,const std::string& privateKeyFile, const std::string& publicKeyFile);
  void genKey(const std::string& privateKeyFile, const std::string& publicKeyFile);
  void loadKey(const std::string& privateKeyFile, const std::string& publicKeyFile);
  std::string encryptText(const std::string& message);
  std::string decryptText(const std::string& message);
  void encryptFile(const std::string& inputFile, const std::string& outputFile);
  void decryptFile(const std::string& inputFile, const std::string& outputFile);
};

#endif