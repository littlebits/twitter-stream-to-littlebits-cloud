# littleBits cloud activated by twitter api stream


Very small server-side app to filter the twitter streaming API for a list of @handles, and trigger cloudBits for mentions and retweets.

## To deploy & use

#### Twitter API credentials

1. Go to https://apps.twitter.com/ and click `Create New App`
1. Fill in the basic info [URL doesn't matter what it is]
1. After your app has been created, click Keys and Access Tokens
1. Scroll down and under *Your Access Token*, click `Create my access token`
1. Now, you will need 4 pieces of information from this page:
  - Consumer Key (API Key)
  - Consumer Secret (API Secret)
  - Access Token
  - Access Token Secret

All 4 items go in the constructor of the `twitter` class.


#### littleBits Cloud API credentials

1. Make sure you have gone through the setup process for a cloudBit you want to control via [Cloud Control](https://control.littlebitscloud.cc) to give it access to your wifi
1. Click [or tap] the Settings tab at the bottom right
1. Under *Advanced,* you will need 2 pieces of information from this page:
  - Device ID
  - AccessToken

Device ID is specific to the cloudBit, while AccessToken is global to the user account, and gives access to all cloudBits on the given account.
