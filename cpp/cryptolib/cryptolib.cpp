#include "cryptolib.h"
#include "aes.h"
#include "ecc.h"

CryptoLib::CryptoLib(const std::string& cryptoType){
  if(cryptoType == "aes"){
    _crypto = new AESCrypto();
  }else if(cryptoType == "ecc"){
    _crypto = new ECCCrypto();
  }
}
CryptoLib::CryptoLib(CryptoType cryptoType){
  if(cryptoType == CryptoType::LIB_AES){
    _crypto = new AESCrypto();
  }else if(cryptoType == CryptoType::LIB_ECC){
    _crypto = new ECCCrypto();
  }
}
CryptoLib::CryptoLib(CryptoType cryptoType,const std::string& privateKeyFile, const std::string& publicKeyFile){
  if(cryptoType == CryptoType::LIB_AES){
    _crypto = new AESCrypto();
  }else if(cryptoType == CryptoType::LIB_ECC){
    _crypto = new ECCCrypto();
  }
  loadKey(privateKeyFile, publicKeyFile);
}

bool CryptoLib::genKey(const std::string& privateKeyFile, const std::string& publicKeyFile){
  return _crypto->genKey(privateKeyFile, publicKeyFile);
}
bool CryptoLib::loadKey(const std::string& privateKeyFile, const std::string& publicKeyFile){
  return _crypto->loadKey(privateKeyFile, publicKeyFile);
}
std::string CryptoLib::encryptText(const std::string& message){
  int length = message.length() + 1;
  byte* newMessage;
  int newLength;
  _crypto->encrypt(reinterpret_cast<const byte*>(message.data()), length, newMessage, newLength);
  std::string newText(reinterpret_cast<char*>(newMessage));
  delete[] newMessage;
  return newText;
}
std::string CryptoLib::decryptText(const std::string& message){
  int length = message.length() + 1;
  byte* newMessage;
  int newLength;
  _crypto->decrypt(reinterpret_cast<const byte*>(message.data()), length, newMessage, newLength);
  std::string newText(reinterpret_cast<char*>(newMessage));
  delete[] newMessage;
  return newText;
}
void CryptoLib::encryptFile(const std::string& inputFile, const std::string& outputFile){
  //return _crypto->encryptFile(inputFile, outputFile);
}
void CryptoLib::decryptFile(const std::string& inputFile, const std::string& outputFile){
  //return _crypto->decryptFile(inputFile, outputFile);
}

CryptoLib::~CryptoLib(){
  if(_crypto != nullptr)
    delete (CryptoClass*)_crypto;
}