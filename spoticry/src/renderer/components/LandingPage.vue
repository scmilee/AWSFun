<template>
  <div>
    <b-form v-if="show">
      <b-form-group id="exampleInputGroup1"
                    label="Desired S3 bucket:"
                    label-for="exampleInput1"
                      >
        <b-form-input id="exampleInput1"
                      v-model="form.bucketName"
                      placeholder="Enter Bucket Name">
        </b-form-input>
        <b-button @click="setS3instance" variant="primary">Confirm</b-button>
      </b-form-group>
      <b-button @click="choosePath" variant="danger">Choose File or Folder</b-button>
      <b-form-group id="exampleInputGroup2"
                    label="Edit File Name(optional):"
                    label-for="exampleInput2">
        
        <b-form-input id="exampleInput2"
                      type="text"
                      v-model="form.fileName"
                      required
                      >
        </b-form-input>
      </b-form-group>
      <b-button @click="upload" variant="primary">Upload</b-button>
     
    </b-form>
  </div>
</template>

<script>
  import spotify from '../lib/Spotify'
  
  export default {
    data () {
      return {
        s3Instance: null,
        form: {
          bucketName: '',
          fileName: '',
          fullPath: '',
          checked: []
        },
        show: true
      }
    },
    methods: {
      onSubmit (evt) {
        evt.preventDefault();
        alert(JSON.stringify(this.form));
      },

      upload (evt) {
        evt.preventDefault();
        this.s3Instance.directoryCheck(this.form.fullPath, this.form.fileName)
      },
      choosePath (evt) {
        evt.preventDefault();
        this.s3Instance.choosePath().then((paths)=> {

          this.form.fullPath = paths[0]
          const parts = paths[0].split("/");
          const fileName = parts.pop();
          this.form.fileName = fileName;
        })
      },
      setS3instance (evt) {
        evt.preventDefault();
        this.s3Instance = new spotify(this.form.bucketName);
      }
    }
  }
</script>


<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
