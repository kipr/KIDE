import * as Babylon from 'babylonjs';
import { Quaternion, ReferenceFrame as RawReferenceFrame, Vector3 as RawVector3 } from '../math';
import { ReferenceFrame } from '../unit-math';
import { Item } from '../state';
import ItemObject from './ItemObject';
import { Mass } from '../util';

export class Can implements ItemObject {
  private config_: ItemObject.Config<Item.Can>;

  private mesh: Babylon.AbstractMesh;

  private scene: Babylon.Scene;

  get item(): Item.Can {
    return this.config_.item;
  }
  get id(): string {
    return this.config_.item.name;
  }

  constructor(scene: Babylon.Scene, config: ItemObject.Config<Item.Can>) {
    const item = Item.Can.fill(config.item);
    this.scene = scene;
    this.config_ = { ...config, item };

    const canMaterial = new Babylon.StandardMaterial("can", this.scene);
    canMaterial.diffuseTexture = new Babylon.Texture('static/Can Texture.png',this.scene);
    canMaterial.emissiveTexture = canMaterial.diffuseTexture.clone();
    canMaterial.emissiveColor = new Babylon.Color3(0.1,0.1,0.1);

    const faceUV: Babylon.Vector4[] = [];
    faceUV[0] = Babylon.Vector4.Zero();
    faceUV[1] = new Babylon.Vector4(1, 0, 0, 1);
    faceUV[2] = Babylon.Vector4.Zero();

    this.mesh = Babylon.MeshBuilder.CreateCylinder(
      this.config_.item.name,
      {
        height: 11.15, 
        diameter: 6, 
        faceUV: faceUV,
      }, 
      this.scene
    );

    this.mesh.material = canMaterial;
    this.mesh.visibility = 0.5;

    const origin = RawReferenceFrame.fill(ReferenceFrame.toRaw(item.origin));
    this.mesh.position = RawVector3.toBabylon(origin.position);
    this.mesh.rotationQuaternion = Quaternion.toBabylon(origin.orientation);
  }

  // Used to create physics impostor of mesh in scene and make opaque
  // Can be used after mesh is created so that transparent item can be maniplated around scene before interacting with it
  public place(): void {
    this.mesh.visibility = 1;
    this.mesh.physicsImpostor = new Babylon.PhysicsImpostor(
      this.mesh, 
      Babylon.PhysicsImpostor.CylinderImpostor, 
      { 
        mass: this.config_.item.mass ? Mass.toGramsValue(this.config_.item.mass) : 5, 
        friction: this.config_.item.friction ? this.config_.item.friction.value : 5,
      }, 
      this.scene
    );
  }
}